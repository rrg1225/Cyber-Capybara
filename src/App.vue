<template>
  <div class="pet-container">
    <div
      class="pet-hitbox"
      @mouseenter="onPetMouseEnter"
      @mouseleave="onPetMouseLeave"
    >
      <div class="pet-wrapper">
        <Transition name="bubble-fade">
          <div v-if="showBubble" class="speech-bubble">
            <p class="speech-text">{{ currentQuote }}</p>
            <span class="bubble-tail" aria-hidden="true" />
          </div>
        </Transition>
        <button
          class="close-btn"
          aria-label="隐藏宠物"
          @click="onHide"
        >&times;</button>
        <img
          class="pet-image"
          :src="petImg"
          alt="Desktop pet"
          draggable="false"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @contextmenu.prevent="onContextMenu"
        />
        <input
          v-model="inputText"
          class="chat-input"
          type="text"
          placeholder="和卡皮巴拉说点什么..."
          :disabled="isStreaming || isPenalized"
          @keydown.enter="onSend"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import petImg from '@/assets/卡皮巴拉打工人努力工作卡通.gif'
import clickSound from '@/assets/click.mp3'
import popSound from '@/assets/pop.mp3'
import angrySound from '@/assets/angry.mp3'
import hmmSound from '@/assets/hmm.mp3'
import laughSound from '@/assets/laugh.mp3'

const quotes = [
  '再摸鱼一会吧',
  '努力打工中...',
  '摸鱼是打工人的基本权利',
  '今天也要加油鸭～',
]

const showBubble = ref(false)
const currentQuote = ref('')
const inputText = ref('')
const isStreaming = ref(false)
let hideTimer = null

const chatHistory = ref([
  {
    role: 'system',
    content:
      '你是一只叫卡皮巴拉的桌面宠物。你的任务是用极简、幽默、治愈的话语舒缓打工人的心情。每次回复不超过30个字。',
  },
])

let clickCount = 0
let lastClickTime = 0
const isPenalized = ref(false)

const audioMap = {
  click: new Audio(clickSound),
  pop: new Audio(popSound),
  angry: new Audio(angrySound),
  hmm: new Audio(hmmSound),
  laugh: new Audio(laughSound),
}

function playSound(type) {
  const audio = audioMap[type]
  if (!audio) return
  audio.currentTime = 0
  audio.play().catch(() => { /* ignore autoplay restriction */ })
}

function setMousePassthrough(ignore) {
  window.electronAPI?.setIgnoreMouseEvents(ignore)
}

function onPetMouseEnter() {
  setMousePassthrough(false)
  window.electronAPI?.windowMouseEnter()
}

function onPetMouseLeave() {
  setMousePassthrough(true)
  window.electronAPI?.windowMouseLeave()
}

function onHide() {
  window.electronAPI?.hideWindow()
}

function onContextMenu() {
  window.electronAPI?.showContextMenu()
}

// --- Custom drag via Pointer Events ---
let isDragging = false
let lastScreenX = 0
let lastScreenY = 0
let hasMoved = false

function onPointerDown(e) {
  isDragging = true
  hasMoved = false
  lastScreenX = e.screenX
  lastScreenY = e.screenY
  e.target.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!isDragging) return
  const dx = e.screenX - lastScreenX
  const dy = e.screenY - lastScreenY
  if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
    hasMoved = true
  }
  if (hasMoved) {
    window.electronAPI?.moveWindowBy(dx, dy)
    lastScreenX = e.screenX
    lastScreenY = e.screenY
  }
}

function onPointerUp(e) {
  isDragging = false
  e.target.releasePointerCapture(e.pointerId)
  if (!hasMoved) {
    onPetClick()
  }
}

function onPetClick() {
  const now = Date.now()

  if (now - lastClickTime < 400) {
    clickCount++
  } else {
    clickCount = 1
  }
  lastClickTime = now

  if (clickCount >= 5) {
    clickCount = 0
    isPenalized.value = true
    playSound('angry')
    currentQuote.value = '别点啦！卡皮巴拉要秃了！😾'
    showBubble.value = true

    if (hideTimer) clearTimeout(hideTimer)
    hideTimer = setTimeout(() => {
      showBubble.value = false
      hideTimer = null
    }, 3000)

    setTimeout(() => {
      isPenalized.value = false
    }, 2000)
    return
  }

  playSound('click')
  currentQuote.value = quotes[Math.floor(Math.random() * quotes.length)]
  showBubble.value = true

  if (hideTimer) {
    clearTimeout(hideTimer)
  }

  hideTimer = setTimeout(() => {
    showBubble.value = false
    hideTimer = null
  }, 3000)
}

function onSend() {
  const text = inputText.value.trim()
  if (!text || isStreaming.value) return

  inputText.value = ''
  chatHistory.value.push({ role: 'user', content: text })

  currentQuote.value = '思考中...'
  showBubble.value = true
  isStreaming.value = true
  playSound('hmm')

  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }

  window.electronAPI?.chatWithQwen(
    chatHistory.value.map((m) => ({ role: m.role, content: m.content })),
  )
}

onMounted(() => {
  setMousePassthrough(true)

  window.electronAPI?.onQwenData((text) => {
    if (currentQuote.value === '思考中...') {
      currentQuote.value = ''
    }
    currentQuote.value += text
  })

  window.electronAPI?.onQwenEnd(() => {
    isStreaming.value = false
    chatHistory.value.push({
      role: 'assistant',
      content: currentQuote.value,
    })

    if (/哈|笑/.test(currentQuote.value)) {
      playSound('laugh')
    } else {
      playSound('pop')
    }

    hideTimer = setTimeout(() => {
      showBubble.value = false
      hideTimer = null
    }, 8000)
  })

  window.electronAPI?.onQwenError((msg) => {
    currentQuote.value = msg
    isStreaming.value = false

    hideTimer = setTimeout(() => {
      showBubble.value = false
      hideTimer = null
    }, 5000)
  })
})

onUnmounted(() => {
  if (hideTimer) {
    clearTimeout(hideTimer)
  }
  setMousePassthrough(true)
})
</script>

<style scoped>
.pet-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  animation: float 3s ease-in-out infinite;
}

.pet-hitbox {
  position: relative;
  padding-top: 72px;
  -webkit-app-region: no-drag;
}

.pet-wrapper {
  position: relative;
  line-height: 0;
}

.speech-bubble {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  min-width: 120px;
  max-width: 200px;
  padding: 10px 14px;
  background: #fffef8;
  border: 2px solid #ffd6e8;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(255, 143, 178, 0.35);
  -webkit-app-region: no-drag;
  pointer-events: auto;
}

.speech-text {
  margin: 0;
  font-size: 13px;
  line-height: 1.45;
  color: #5c4a42;
  text-align: center;
  font-weight: 500;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 100px;
  overflow-y: auto;
  padding-right: 4px;
}

.bubble-tail {
  position: absolute;
  bottom: -9px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-top: 10px solid #ffd6e8;
}

.bubble-tail::after {
  content: '';
  position: absolute;
  top: -12px;
  left: -7px;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 8px solid #fffef8;
}

.pet-image {
  width: 180px;
  height: auto;
  display: block;
  user-select: none;
  cursor: pointer;
  transition: transform 0.25s ease;
  touch-action: none;
}

.pet-image:hover {
  transform: scale(1.08);
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 22px;
  height: 22px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.18);
  color: #fff;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  cursor: pointer;
  -webkit-app-region: no-drag;
  opacity: 0;
  transition: opacity 0.25s ease;
  z-index: 30;
}

.pet-wrapper:hover .close-btn {
  opacity: 1;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.45);
}

.chat-input {
  display: block;
  width: 180px;
  margin-top: 6px;
  padding: 6px 10px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.35);
  font-size: 12px;
  color: #5c4a42;
  text-align: center;
  outline: none;
  -webkit-app-region: no-drag;
  transition: background 0.25s ease;
  box-sizing: border-box;
}

.chat-input::placeholder {
  color: #b8a59e;
}

.chat-input:hover,
.chat-input:focus {
  background: rgba(255, 255, 255, 0.72);
}

.bubble-fade-enter-active,
.bubble-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.bubble-fade-enter-from,
.bubble-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(6px);
}

.speech-text::-webkit-scrollbar {
  width: 4px;
}
.speech-text::-webkit-scrollbar-track {
  background: transparent;
}
.speech-text::-webkit-scrollbar-thumb {
  background: #ffd6e8;
  border-radius: 4px;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
</style>
