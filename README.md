<p align="center">
  <img src="src/assets/卡皮巴拉打工人努力工作卡通.gif" width="160" alt="Cyber-Capybara" />
</p>

<h1 align="center">🦫 卡皮巴拉桌宠 · Cyber-Capybara</h1>

<p align="center">
  <b>你的赛博摸鱼搭子 — 一只住在桌面上的 AI 卡皮巴拉</b><br/>
  <sub>陪你打工 · 听你吐槽 · 贴边隐身 · 暴躁连击 · 流式聊天</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Electron-35.x-47848F?logo=electron&logoColor=white" alt="Electron" />
  <img src="https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vuedotjs&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/AI-通义千问-FF6A00?logo=alibabacloud&logoColor=white" alt="DashScope" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
</p>

---

## 📖 项目简介

基于 **Electron 35 + Vue 3 + Vite** 构建的一只赛博卡皮巴拉桌面宠物。透明无边框窗口悬浮于桌面，集成**通义千问 (Qwen-Turbo)** 大模型实现流式对话，配合 5 种智能音效联动和丰富的交互动画，是你桌面上最治愈的摸鱼搭子。

| 层级 | 技术选型 |
|:---|:---|
| 🖥️ 桌面壳层 | Electron 35 — 透明窗口 · 托盘 · 全局快捷键 · 开机自启 |
| 🎨 前端渲染 | Vue 3 (Composition API) + Vite 6 |
| 🧠 AI 后端 | 阿里 DashScope — Qwen-Turbo，原生 HTTPS SSE 流式解析 |
| 🔌 IPC 桥接 | contextBridge + ipcMain / ipcRenderer |
| 💾 本地持久化 | electron-store — API Key 安全存储 · 窗口位置记忆 |
| 📦 打包分发 | electron-builder — NSIS 安装包 / portable 便携版 |

---

## ✨ 核心特性

| 🦫 特性 | 说明 |
|:---|:---|
| 🖥️ **桌面悬浮** | 透明无边框窗口，`alwaysOnTop` 置顶，GIF 动画 + CSS float 浮动呼吸感 |
| 🧲 **边缘吸附 & 探头** | 拖至屏幕边缘自动贴边隐藏（仅留 30px），鼠标扫过滑出、离开贴回——QQ 同款体验 |
| 🤖 **AI 流式对话** | 接入 Qwen-Turbo，SSE 打字机流式输出，支持多轮上下文连续对话 |
| 🖱️ **自定义拖拽** | 剥离 `-webkit-app-region`，基于 Pointer Events + IPC `setPosition` 实现"点拖分离"丝滑拖拽 |
| 🔊 **智能音效联动** | 点击 / 思考 / 回复 / 大笑 / 愤怒，5 种音效根据回复内容自动匹配 |
| 😾 **暴躁连击彩蛋** | 0.4s 内连击 5 次触发惩罚——禁用输入 2s + 愤怒咆哮"别点啦！卡皮巴拉要秃了！" |
| 🔑 **老板键** | `Ctrl+Shift+P` 一键隐藏/显示，摸鱼安全第一 |
| 🖱️ **右键原生菜单** | 右键宠物弹出系统菜单，快速隐藏或退出 |
| 📍 **位置记忆** | electron-store 持久化窗口坐标，重启不丢失 |
| 🔐 **聊天框注入密钥** | 无需 `.env`——直接把 `sk-` 密钥发给宠物，自动识别并持久化，打包后也能激活 |

---

## 🚀 快速开始

### 1. 克隆与安装

```bash
git clone https://github.com/your-username/cyber-capybara.git
cd cyber-capybara
npm install
```

### 2. 启动开发模式

```bash
npm run dev
```

Vite 启动前端开发服务器后，Electron 窗口会自动打开，卡皮巴拉现身桌面 🎉

### 3. 激活 AI 灵魂

在宠物的聊天框中，像对话一样粘贴你的 [DashScope API Key](https://dashscope.console.aliyun.com/)（以 `sk-` 开头），回车发送即可。宠物会回复"吧唧吧唧...密钥吃掉啦！"，此后即可自由对话。

> 💡 **无需手动创建 `.env` 文件**——密钥通过 electron-store 加密持久化到本地，开发/生产环境通用。

---

## 📦 打包部署

### 一键打包

```bash
# Windows NSIS 安装包
npm run build:win

# Windows 便携版（免安装）
npm run build:portable

# macOS DMG
npm run build:mac

# Linux AppImage
npm run build:linux
```

打包产物输出到 `release/` 目录。

### ⚠️ 国内网络打包慢？使用镜像加速

由于 electron-builder 默认从 GitHub Releases 拉取 Electron 二进制文件和 winCodeSign，国内网络极易超时。配置阿里云 npmmirror 镜像可大幅提速：

**Windows PowerShell：**

```powershell
$env:ELECTRON_MIRROR = "https://npmmirror.com/mirrors/electron/"
$env:ELECTRON_BUILDER_BINARIES_MIRROR = "https://npmmirror.com/mirrors/electron-builder-binaries/"
npm run build:win
```

**macOS / Linux (bash/zsh)：**

```bash
export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
export ELECTRON_BUILDER_BINARIES_MIRROR="https://npmmirror.com/mirrors/electron-builder-binaries/"
npm run build:win
```

> 💡 如果仍然遇到 7z 解压权限报错，请以**管理员权限**运行 VS Code 或终端后再执行构建命令。

---

## 🛠️ 踩坑与技术开发日志

以下是本项目从零到打包发布过程中遇到的 **5 个核心坑位**及其解决方案，供各位 Electron 开发者参考避坑。

---

### 🕳️ 坑位 1：Electron 打包网络超时与 7z 解压权限报错

**现象**

- `electron-builder` 构建时卡在 `Downloading electron-v35.0.1-win32-x64.zip` 直至超时
- Windows 下报错 `7z: cannot create symbolic link — Access is denied`

**根因**

1. electron-builder 默认从 GitHub Releases 拉取 Electron 运行时（~80MB），国内直连极其缓慢且容易断连。
2. winCodeSign 等依赖同样需从 GitHub 下载，进一步放大超时风险。
3. Windows 下 7z 解压创建软链接需要管理员权限，普通终端默认无此权限。

**解决方案**

```powershell
# 1. 配置阿里云 npmmirror 镜像源加速所有依赖下载
$env:ELECTRON_MIRROR = "https://npmmirror.com/mirrors/electron/"
$env:ELECTRON_BUILDER_BINARIES_MIRROR = "https://npmmirror.com/mirrors/electron-builder-binaries/"

# 2. 以管理员权限运行终端，再执行构建
npm run build:win
```

---

### 🕳️ 坑位 2：`-webkit-app-region: drag` 与点击事件的底层冲突

**现象**

给 `.pet-wrapper` 设置 CSS `-webkit-app-region: drag` 后，虽然可以拖拽窗口，但 Windows 下该属性会**吞掉所有 mouse click 事件**——点击宠物无法触发任何 JS 回调，音效和对话气泡完全失效。

**根因**

Chromium 在 Windows 平台上，`-webkit-app-region: drag` 会将鼠标事件直接交由系统窗口管理器处理，导致 JavaScript 层的 click / mousedown / mouseup 事件完全不被派发。

**解决方案：Pointer Events + IPC 自定义拖拽**

剥离所有 CSS 拖拽属性，改用 Vue 原生 Pointer Events 接管交互：

1. **前端 (App.vue)** — 在 `<img>` 上绑定 `@pointerdown` / `@pointermove` / `@pointerup`，通过 `setPointerCapture` 锁定焦点防止滑出，以 2px 位移阈值区分"拖拽"与"点击"。
2. **主进程 (main.js)** — 新增 `ipcMain.on('move-window-by')` 监听器，接收增量 `(dx, dy)` 后调用 `mainWindow.setPosition()` 移动窗口。
3. **preload** — 暴露 `moveWindowBy(dx, dy)` 桥接方法。

```javascript
// main.js — IPC 拖拽处理
ipcMain.on('move-window-by', (_event, dx, dy) => {
  if (!mainWindow) return
  const [x, y] = mainWindow.getPosition()
  mainWindow.setPosition(Math.round(x + dx), Math.round(y + dy))
})
```

```javascript
// App.vue — Pointer Events 拖拽逻辑
let isDragging = false, lastScreenX = 0, lastScreenY = 0, hasMoved = false

function onPointerDown(e) {
  isDragging = true; hasMoved = false
  lastScreenX = e.screenX; lastScreenY = e.screenY
  e.target.setPointerCapture(e.pointerId)  // 锁定焦点
}

function onPointerMove(e) {
  if (!isDragging) return
  const dx = e.screenX - lastScreenX, dy = e.screenY - lastScreenY
  if (Math.abs(dx) > 2 || Math.abs(dy) > 2) hasMoved = true
  if (hasMoved) {
    window.electronAPI.moveWindowBy(dx, dy)
    lastScreenX = e.screenX; lastScreenY = e.screenY
  }
}

function onPointerUp(e) {
  isDragging = false
  e.target.releasePointerCapture(e.pointerId)
  if (!hasMoved) onPetClick()  // 未拖拽 = 点击
}
```

---

### 🕳️ 坑位 3：Windows 屏幕缩放导致 C++ 底层坐标转换崩溃

**现象**

在开启了 125% / 150% 屏幕缩放的 Windows 设备上，拖拽宠物时 Electron 静默崩溃或报底层 `conversion failure` 错误，窗口直接消失。

**根因**

高分屏缩放 (DPI Scaling) 下，`e.screenX` 和 `e.screenY` 经过物理像素与逻辑像素的分数倍率换算，产生**浮点数坐标**。Electron 的 `setPosition()` 底层调用 Windows GDI API `SetWindowPos`，该 API 在 C++ 端要求整数坐标，传入浮点数会触发未定义行为或静默失败。

**解决方案**

在向主进程传递累加坐标时，**强制 `Math.round()` 取整**，杜绝任何浮点数传递到底层：

```javascript
// ✅ 正确
mainWindow.setPosition(Math.round(x + dx), Math.round(y + dy))

// ❌ 错误 — Windows 缩放下 dx/dy 可能为 1.25, 2.5 等小数
mainWindow.setPosition(x + dx, y + dy)
```

---

### 🕳️ 坑位 4：生产环境 (.exe) 大模型 API Key 丢失

**现象**

开发模式下一切正常，但 `electron-builder` 打包出的 `.exe` 安装运行后，发送消息给宠物始终回复"我还是一只没有灵魂的卡皮巴拉"——API Key 不见了。

**根因**

`.env` 文件依赖 `dotenv` 从文件系统读取，但 `electron-builder` 的打包配置 (`files: ["dist/**/*", "electron/**/*", "package.json"]`) 不会包含 `.env`。即使手动将其加入 `files` 列表，把密钥打包进 `.exe` 也有**严重的安全风险**（任何人都可以解包提取）。

**解决方案：聊天框作为密钥注入后门**

利用宠物已有的聊天输入框作为隐蔽的密钥注入通道，用户像说话一样发送 `sk-xxx`，主进程拦截后持久化到本地：

```javascript
// main.js — chat-with-qwen handler 中的密钥拦截逻辑
const userText = messages[messages.length - 1]?.content || ''

if (userText.trim().startsWith('sk-')) {
  store.set('QWEN_API_KEY', userText.trim())                         // 持久化
  event.sender.send('qwen-stream-data', '吧唧吧唧...密钥吃掉啦！')    // 反馈
  event.sender.send('qwen-stream-end')
  return                                                              // 阻断请求
}

const apiKey = store.get('QWEN_API_KEY') || process.env.QWEN_API_KEY  // 优先读本地
if (!apiKey) {
  event.sender.send('qwen-stream-error', '我还是一只没有灵魂的卡皮巴拉...')
  return
}

// 发送 API 请求前，过滤掉 sk- 历史消息防止污染对话
const cleanMessages = messages.filter(m => !m.content.startsWith('sk-'))
```

| 对比 | 传统 .env 方案 | electron-store 持久化方案 |
|:---|:---|:---|
| 开发环境 | 手动创建 `.env` 文件 | 聊天框直接发送密钥 |
| 生产打包 | ❌ 密钥丢失 | ✅ 本地持久化，一次配置永久生效 |
| 安全性 | ⚠️ 可能被打包泄露 | ✅ 存储在用户本地 Application Data，不随安装包分发 |
| UX | 需要文件操作 | 像聊天一样自然 |

---

### 🕳️ 坑位 5：Git Push 触发 100MB 大文件限制

**现象**

`git push` 时报错：

```
remote: error: File release/卡皮巴拉桌宠 Setup 1.0.0.exe is 112.54 MB;
this exceeds GitHub's file size limit of 100.00 MB
```

**根因**

打包产物 (`release/`)、Electron 运行时 DLL / pak / bin / dat 文件、以及 `.exe` 被意外加入 Git 暂存区，这些二进制文件远超 GitHub 100MB 单文件限制。

**解决方案**

1. 配置严谨的 `.gitignore`：
    ```gitignore
    # 打包产物
    dist/
    release/

    # Electron 运行时二进制
    *.exe
    *.dll
    *.pak
    *.dat
    *.bin
    locales/

    # 密钥 & 依赖
    .env
    node_modules/
    ```

2. 清理 Git 缓存并重新提交：
    ```bash
    git rm -r --cached .
    git add .
    git commit -m "chore: clean up build artifacts from git tracking"
    git push
    ```

---

## 🗺 未来展望

- [ ] **🛡️ 纯本地大模型** — 接入 Ollama + Qwen / DeepSeek，完全离线、隐私零泄露
- [ ] **🎭 更多皮肤 & Live2D** — 支持角色切换、Spine 动画，可替换宠物形象
- [ ] **🔄 CI/CD 自动发版** — GitHub Actions 自动构建 Win / Mac / Linux Release
- [ ] **⏱️ 效率工具集成** — 番茄钟、喝水提醒、剪贴板历史浮窗
- [ ] **🌐 多模型切换** — 一键切换 OpenAI / Claude / DeepSeek 等后端
- [ ] **🫧 气泡主题换肤** — 对话气泡多套配色与圆角风格

---

## 🤝 参与贡献

Issues & PRs welcome！

1. Fork 本仓库
2. `git checkout -b feat/amazing-idea`
3. `git commit -m 'feat: add amazing idea'`
4. `git push origin feat/amazing-idea`
5. 提交 Pull Request 🎉

---

## 📄 License

MIT © 2025 Cyber-Capybara

<p align="center">
  <sub>🦫 摸鱼是第一生产力 · Procrastination is the mother of invention 🦫</sub>
</p>
