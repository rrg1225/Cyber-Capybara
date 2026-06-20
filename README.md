# Capybara Desktop Pet

[简体中文](#简体中文) | [English](#english)

A lightweight Electron + Vue desktop companion with transparent floating-window behavior, drag interactions, edge snapping, sound effects, and optional Qwen-powered chat.

---

## 简体中文

### 项目亮点

- **透明悬浮桌宠**：Electron frameless transparent window，支持置顶展示。
- **自然交互**：点击触发随机治愈文案，拖拽移动，靠边自动隐藏，鼠标靠近自动展开。
- **托盘与快捷键**：托盘菜单隐藏/显示，`Ctrl + Shift + P` 快速切换窗口。
- **声音反馈**：点击、思考、开心、警告等本地音效增强陪伴感。
- **可选 AI 对话**：通过本地 `electron-store` 保存 Qwen API Key，生产环境不依赖明文 `.env`。
- **安全隔离**：启用 `contextIsolation`、`sandbox` 和 preload 白名单 IPC。
- **监听清理**：组件卸载时清理 Qwen streaming IPC 监听，避免开发热更新重复回调。

### 快速开始

```bash
npm install
npm run dev
```

开发模式会启动 Vite 渲染层，Electron 主进程加载 `http://localhost:5173`。

### 打包

```bash
npm run build:renderer
npm run build
```

Windows 安装包输出到 `release/`。

### AI Key 设置

方式一：复制 `.env.example` 为 `.env`，仅本地开发使用。

```env
QWEN_API_KEY=YOUR_API_KEY_HERE
```

方式二：运行桌宠后，直接把 `sk-` 开头的 Key 当作聊天消息发给桌宠，应用会写入本地 `electron-store`，不会转发给模型。

---

## English

### Highlights

- **Transparent floating pet** with a frameless always-on-top Electron window.
- **Natural interactions**: click quotes, drag movement, edge snapping, and hover-to-reveal behavior.
- **Tray and shortcut controls**: tray menu plus `Ctrl + Shift + P` visibility toggle.
- **Local sound feedback** for click, thinking, happy, and warning states.
- **Optional Qwen chat** with API key stored locally through `electron-store`.
- **Security-conscious shell** using `contextIsolation`, `sandbox`, and a small preload IPC bridge.
- **Listener cleanup** removes Qwen streaming IPC handlers on unmount to avoid duplicate callbacks during development.

### Quick Start

```bash
npm install
npm run dev
```

Development mode starts the Vite renderer and loads it from Electron.

### Build

```bash
npm run build:renderer
npm run build
```

Windows installer artifacts are generated in `release/`.

### AI Key Setup

Option 1: copy `.env.example` to `.env` for local development.

```env
QWEN_API_KEY=YOUR_API_KEY_HERE
```

Option 2: send an `sk-` API key as a chat message inside the pet UI. The app stores it locally and filters it out before sending chat history to the model.

## Repository Topics

`electron`, `vue`, `vite`, `desktop-pet`, `desktop-app`, `qwen`
