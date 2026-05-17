<p align="center">
  <img src="src/assets/卡皮巴拉打工人努力工作卡通.gif" width="160" alt="Cyber-Capybara" />
</p>

<h1 align="center">🦫 Cyber-Capybara</h1>
<p align="center">
  <b>你的赛博摸鱼搭子 · AI-Powered Desktop Companion</b><br/>
  <sub>一只住在你桌面上的 AI 卡皮巴拉，陪你打工、听你吐槽、贴边隐身、暴躁连击。</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Electron-35.x-47848F?logo=electron&logoColor=white" alt="Electron" />
  <img src="https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vuedotjs&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/AI-DashScope%20QWEN-FF6A00?logo=alibabacloud&logoColor=white" alt="DashScope" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
</p>

---

## 📸 Preview / 演示

<p align="center">
  <i>👇 占位 — 放一张宠物在桌面上飘着聊天的 GIF 动图</i><br/>
  <img src="screenshots/demo.gif" width="420" alt="demo" />
</p>

<details>
<summary>🎬 更多截图 (More Screenshots)</summary>
<p align="center">
  <i>边缘吸附半隐藏状态</i><br/>
  <img src="screenshots/snap.png" width="420" alt="snap" /><br/><br/>
  <i>暴躁连击彩蛋</i><br/>
  <img src="screenshots/rage.png" width="420" alt="rage" />
</p>
</details>

---

## ✨ Core Features / 核心特性

| 🦫 Feature                              | 说明                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------ |
| 🤖 **流式 AI 对话**                      | 接入阿里通义千问 (DashScope)，实时 SSE 打字机流式输出，上下文连续多轮聊天 |
| 🔊 **智能音效联动**                      | 点击 / 思考 / 回复 / 大笑 全有音效反馈，根据 AI 回复内容自动匹配           |
| 🧲 **边缘自动吸附 & 探头**               | 拖到屏幕边缘自动贴边，仅留 30px；鼠标扫过探头滑出，离开后贴回（QQ 同款）  |
| 😾 **暴躁连击状态机**                    | 0.4s 内连击 5 次触发惩罚彩蛋 — 禁用输入 2 秒 + 愤怒咆哮                    |
| 🔑 **老板键**                            | `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) 一键隐藏 / 显示，摸鱼安全第一          |
| 🖱️ **右键原生菜单**                      | 右键宠物弹出系统菜单，快速隐藏或退出                                      |
| 📍 **位置记忆**                          | 自动记住上次拖动位置，重启不丢失                                          |
| 🚀 **开机自启**                          | 打包后静默启动，开机即陪伴                                                |

---

## 🚀 Quick Start / 快速开始

### 1. Clone & Install / 克隆并安装

```bash
git clone https://github.com/your-username/cyber-capybara.git
cd cyber-capybara
npm install
```

### 2. Configure API Key / 配置千问密钥

```bash
# 复制示例文件
cp .env.example .env
```

编辑 `.env`，填入你的 [DashScope API Key](https://dashscope.console.aliyun.com/)：

```env
QWEN_API_KEY=sk-your-real-api-key-here
```

> ⚠️ **`.env` 已在 `.gitignore` 中，不会被提交到 GitHub。请不要把真实 Key 写在 `.env.example` 里！**

### 3. Launch Dev Mode / 启动开发模式

```bash
npm run dev
```

宠物会出现在桌面中央 🎉

---

## 📦 Build & Package / 打包为独立软件

### 安装 electron-builder

```bash
npm install --save-dev electron-builder
```

### 配置打包脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "build:exe": "vite build && electron-builder --win",
    "build:dmg": "vite build && electron-builder --mac",
    "build:linux": "vite build && electron-builder --linux"
  },
  "build": {
    "appId": "com.cybercapybara.app",
    "productName": "Cyber-Capybara",
    "files": ["dist/**/*", "electron/**/*", "package.json"],
    "directories": { "output": "release" },
    "win": { "target": "nsis", "icon": "src/assets/icon.ico" },
    "mac": { "target": "dmg", "icon": "src/assets/icon.icns" },
    "linux": { "target": "AppImage", "icon": "src/assets/icon.png" }
  }
}
```

### 执行打包

```bash
# Windows
npm run build:exe

# macOS
npm run build:dmg
```

打包产物在 `release/` 目录。安装后宠物即可**脱离终端独立运行**，配合内置的**开机自启** (`app.setLoginItemSettings`)，每次开机自动出现在桌面 🦫。

---

## 🛠 Tech Stack / 技术栈

<p align="center">
  <img src="https://img.shields.io/badge/Electron-35.x-47848F?logo=electron&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Vue_3-4FC08D?logo=vuedotjs&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/DashScope_API-FF6A00?logo=alibabacloud&logoColor=white&style=for-the-badge" />
</p>

| 层级 Layer         | 技术                                                    |
| ------------------ | ------------------------------------------------------- |
| 🖥️ Desktop Shell   | Electron 35 — 透明无边框窗口、托盘、全局快捷键、开机自启 |
| 🎨 Frontend        | Vue 3 (Composition API) + Vite — 响应式 UI、CSS 浮动动画  |
| 🧠 AI Backend      | 阿里 DashScope API — Qwen-Turbo，原生 SSE 流式解析        |
| 🔌 IPC Bridge      | contextBridge + ipcMain/ipcRenderer — 安全双向通信       |
| 💾 Persistence     | electron-store — 窗口位置记忆                            |
| 🔊 Audio           | Web Audio API — 5 种智能音效联动                          |

---

## 🗺 Roadmap / 未来演进

- [ ] **🛡️ 纯本地大模型** — 接入 Ollama + Qwen / DeepSeek，实现完全离线、隐私零泄露运行
- [ ] **🔄 CI/CD 自动发版** — GitHub Actions 自动构建 Win/Mac/Linux Release 安装包
- [ ] **🎭 更多宠物皮肤** — 支持 Live2D / Spine 动画，可替换角色模型
- [ ] **⏱️ 效率工具集成** — 番茄钟计时器、剪贴板历史浮窗、喝水提醒
- [ ] **🫧 气泡主题换肤** — 对话气泡多套配色 & 圆角风格切换
- [ ] **🌐 多语言模型切换** — 一键切换 OpenAI / Claude / DeepSeek 等后端

---

## 🤝 Contributing / 参与贡献

Issues & PRs welcome! 欢迎提 Issue 和 PR。

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
