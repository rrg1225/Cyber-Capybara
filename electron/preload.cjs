const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * @param {boolean} ignore true = 鼠标穿透；false = 捕获鼠标
   */
  setIgnoreMouseEvents: (ignore) =>
    ipcRenderer.invoke('set-ignore-mouse-events', ignore),

  chatWithQwen: (messages) =>
    ipcRenderer.send('chat-with-qwen', messages),

  onQwenData: (callback) =>
    ipcRenderer.on('qwen-stream-data', (_event, data) => callback(data)),

  onQwenEnd: (callback) =>
    ipcRenderer.on('qwen-stream-end', () => callback()),

  onQwenError: (callback) =>
    ipcRenderer.on('qwen-stream-error', (_event, msg) => callback(msg)),

  hideWindow: () => ipcRenderer.send('hide-window'),

  showContextMenu: () => ipcRenderer.send('show-context-menu'),

  windowMouseEnter: () => ipcRenderer.send('window-mouseenter'),

  windowMouseLeave: () => ipcRenderer.send('window-mouseleave'),
})
