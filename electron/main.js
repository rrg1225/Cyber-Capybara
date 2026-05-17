import 'dotenv/config'
import { app, BrowserWindow, globalShortcut, Menu, Tray, ipcMain, nativeImage, screen } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import https from 'node:https'
import Store from 'electron-store'

const store = new Store()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isDev = !app.isPackaged

/** @type {BrowserWindow | null} */
let mainWindow = null

/** @type {Tray | null} */
let tray = null

const VISIBLE_PX = 30
const SNAP_THRESHOLD = 20
let isSnapped = false
let snappedEdge = null
let savedVisibleBounds = null
let snapDebounceTimer = null
let isSnapping = false

function setWindowMousePassthrough(ignore) {
  if (!mainWindow) return

  if (ignore) {
    mainWindow.setIgnoreMouseEvents(true, { forward: true })
  } else {
    mainWindow.setIgnoreMouseEvents(false)
  }
}

function applySnap() {
  if (!mainWindow) return
  const bounds = mainWindow.getBounds()
  const { width: waW, height: waH } = screen.getPrimaryDisplay().workAreaSize

  let tx = bounds.x
  let ty = bounds.y
  let edge = null

  if (bounds.x < SNAP_THRESHOLD) {
    tx = -(bounds.width - VISIBLE_PX)
    edge = 'left'
  } else if (bounds.x + bounds.width > waW - SNAP_THRESHOLD) {
    tx = waW - VISIBLE_PX
    edge = 'right'
  }

  if (!edge && bounds.y < SNAP_THRESHOLD) {
    ty = -(bounds.height - VISIBLE_PX)
    edge = 'top'
  }

  if (edge) {
    savedVisibleBounds = { x: bounds.x, y: bounds.y }
    isSnapped = true
    snappedEdge = edge
    isSnapping = true
    mainWindow.setBounds({ x: tx, y: ty, width: bounds.width, height: bounds.height })
    isSnapping = false
  } else {
    isSnapped = false
    snappedEdge = null
    savedVisibleBounds = null
  }
}

function createWindow() {
  const savedBounds = store.get('windowBounds')

  mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    ...(savedBounds?.x != null && savedBounds?.y != null
      ? { x: savedBounds.x, y: savedBounds.y }
      : {}),
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    backgroundColor: '#00000000',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  })

  mainWindow.on('moved', () => {
    if (isSnapping) return

    const { x, y } = mainWindow.getBounds()
    store.set('windowBounds', { x, y })

    if (snapDebounceTimer) clearTimeout(snapDebounceTimer)
    snapDebounceTimer = setTimeout(() => {
      applySnap()
    }, 200)
  })

  mainWindow.webContents.once('did-finish-load', () => {
    setWindowMousePassthrough(true)
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  return mainWindow
}

function toggleWindowVisibility() {
  if (!mainWindow) return

  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    mainWindow.show()
    mainWindow.focus()
    setWindowMousePassthrough(true)
  }
}

function createTray() {
  const icon = nativeImage.createEmpty()
  tray = new Tray(icon)
  tray.setToolTip('我的桌面宠物')

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '隐藏/显示宠物',
      click: toggleWindowVisibility,
    },
    {
      label: '退出',
      click: () => {
        app.quit()
      },
    },
  ])

  tray.setContextMenu(contextMenu)
}

ipcMain.handle('set-ignore-mouse-events', (_event, ignore) => {
  setWindowMousePassthrough(Boolean(ignore))
})

ipcMain.on('hide-window', () => {
  mainWindow?.hide()
})

ipcMain.on('show-context-menu', (event) => {
  const menu = Menu.buildFromTemplate([
    {
      label: '隐藏宠物',
      click: () => { mainWindow?.hide() },
    },
    {
      label: '退出',
      click: () => { app.quit() },
    },
  ])
  menu.popup({ window: BrowserWindow.fromWebContents(event.sender) })
})

ipcMain.on('window-mouseenter', () => {
  if (!isSnapped || !mainWindow || !savedVisibleBounds) return
  isSnapping = true
  const b = mainWindow.getBounds()
  mainWindow.setBounds({
    x: savedVisibleBounds.x,
    y: savedVisibleBounds.y,
    width: b.width,
    height: b.height,
  })
  isSnapping = false
})

ipcMain.on('window-mouseleave', () => {
  if (!isSnapped || !mainWindow) return
  const b = mainWindow.getBounds()
  savedVisibleBounds = { x: b.x, y: b.y }
  isSnapping = true
  const { width: waW, height: waH } = screen.getPrimaryDisplay().workAreaSize
  let tx = b.x
  let ty = b.y
  if (snappedEdge === 'left') tx = -(b.width - VISIBLE_PX)
  else if (snappedEdge === 'right') tx = waW - VISIBLE_PX
  else if (snappedEdge === 'top') ty = -(b.height - VISIBLE_PX)
  mainWindow.setBounds({ x: tx, y: ty, width: b.width, height: b.height })
  isSnapping = false
})

ipcMain.on('chat-with-qwen', (event, messages) => {
  const apiKey = process.env.QWEN_API_KEY
  if (!apiKey) {
    event.sender.send('qwen-stream-error', '请在 .env 文件中配置 API Key')
    return
  }

  const body = JSON.stringify({
    model: 'qwen-turbo',
    input: { messages },
    parameters: {
      incremental_output: true,
    },
  })

  const req = https.request(
    {
      hostname: 'dashscope.aliyuncs.com',
      path: '/api/v1/services/aigc/text-generation/generation',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    },
    (res) => {
      if (res.statusCode !== 200) {
        let errorBody = ''
        res.on('data', (chunk) => { errorBody += chunk.toString() })
        res.on('end', () => {
          let msg = `API 返回状态码 ${res.statusCode}`
          try {
            const err = JSON.parse(errorBody)
            msg = err?.message || msg
          } catch (_) { /* ignore parse failure */ }
          event.sender.send('qwen-stream-error', msg)
        })
        return
      }

      let buffer = ''

      res.on('data', (chunk) => {
        buffer += chunk.toString()

        const events = buffer.split('\n\n')
        buffer = events.pop() || ''

        for (const eventStr of events) {
          const dataLine = eventStr.trim()
          if (!dataLine.startsWith('data:')) continue
          try {
            const json = JSON.parse(dataLine.slice(5).trim())
            const text = json?.output?.text
            if (text) {
              event.sender.send('qwen-stream-data', text)
            }
          } catch (_) { /* skip unparseable SSE events */ }
        }
      })

      res.on('end', () => {
        event.sender.send('qwen-stream-end')
      })

      res.on('error', (err) => {
        event.sender.send('qwen-stream-error', err.message)
      })
    },
  )

  req.on('error', (err) => {
    event.sender.send('qwen-stream-error', err.message)
  })

  req.write(body)
  req.end()
})

app.whenReady().then(() => {
  createWindow()
  createTray()

  globalShortcut.register('CommandOrControl+Shift+P', () => {
    toggleWindowVisibility()
  })

  app.setLoginItemSettings({ openAtLogin: true })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    } else if (mainWindow && !mainWindow.isVisible()) {
      mainWindow.show()
      setWindowMousePassthrough(true)
    }
  })
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

app.on('window-all-closed', () => {
  // 保留托盘进程，通过托盘菜单退出
})
