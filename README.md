# Capybara Desktop Pet

[简体中文](#简体中文) | [English](#english)

A lightweight Electron + Vue desktop companion with transparent floating-window behavior, drag interactions, edge snapping, sound effects, and optional Qwen-powered chat.

> Resume and interview brief: [PORTFOLIO.md](PORTFOLIO.md)
> Enterprise architecture: [docs/ENTERPRISE_ARCHITECTURE.md](docs/ENTERPRISE_ARCHITECTURE.md)

---

## 简体中文

### 项目亮点

- **透明悬浮桌宠**：Electron frameless transparent window，适合长期悬浮在桌面角落。
- **自然交互**：点击文案、拖拽移动、靠边吸附、自动隐藏、鼠标靠近展开。
- **托盘与快捷键**：托盘菜单控制显示/隐藏，`Ctrl + Shift + P` 快速切换窗口。
- **本地音效反馈**：点击、思考、开心、警告等音效增强陪伴感。
- **可选 Qwen 对话**：API Key 存在本地 `electron-store`，生产环境不依赖明文 `.env`。
- **聊天安全边界**：`electron/chatSafety.js` 统一过滤 `sk-` 密钥、限制上下文长度、规范角色。
- **自动化验证**：Node test 覆盖聊天安全逻辑，CI 同时跑测试和 renderer 构建。

### 快速开始

```bash
npm install
npm run dev
```

### 常用命令

```bash
npm test
npm run build:renderer
npm run build
```

### AI Key 设置

方式一：复制 `.env.example` 为 `.env`，仅用于本地开发。

```env
QWEN_API_KEY=YOUR_API_KEY_HERE
```

方式二：运行桌宠后，把 `sk-` 开头的 Key 当作聊天消息发送给桌宠。应用会写入本地 `electron-store`，并在发送给模型前过滤掉密钥消息。

---

## English

### Highlights

- **Transparent floating pet** with a frameless always-on-top Electron window.
- **Natural interactions**: click quotes, drag movement, edge snapping, and hover-to-reveal behavior.
- **Tray and shortcut controls** via tray menu and `Ctrl + Shift + P`.
- **Local sound feedback** for click, thinking, happy, and warning states.
- **Optional Qwen chat** with API key stored locally through `electron-store`.
- **Tested chat safety layer** for key filtering, role normalization, and context truncation.
- **CI verification** for unit tests and renderer build.

### Repository Topics

`electron`, `vue`, `vite`, `desktop-pet`, `desktop-app`, `qwen`
