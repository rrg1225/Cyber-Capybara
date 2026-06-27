# Cyber Capybara Desktop Pet

[![CI](https://github.com/rrg1225/Cyber-Capybara/actions/workflows/ci.yml/badge.svg)](https://github.com/rrg1225/Cyber-Capybara/actions/workflows/ci.yml)
![Electron](https://img.shields.io/badge/Electron-Desktop-47848F?logo=electron)
![Vue](https://img.shields.io/badge/Vue-3-42B883?logo=vuedotjs)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)
![Qwen](https://img.shields.io/badge/Qwen-Optional%20Chat-FF6A00)

Cyber Capybara is a lightweight Electron + Vue desktop companion with transparent floating-window behavior, drag interactions, edge snapping, sound effects, tray controls, and optional Qwen-powered chat.

> Resume and interview brief: [PORTFOLIO.md](PORTFOLIO.md)
> Enterprise architecture: [docs/ENTERPRISE_ARCHITECTURE.md](docs/ENTERPRISE_ARCHITECTURE.md)

## Features

- Transparent frameless always-on-top Electron window.
- Click quotes, drag movement, edge snapping, and hover-to-reveal behavior.
- Tray menu and `Ctrl + Shift + P` visibility toggle.
- Local sound feedback for click, thinking, happy, and warning states.
- Optional Qwen streaming chat.
- API key storage through `electron-store`.
- Chat safety layer for key filtering, role normalization, and context bounds.
- Renderer build CI.

## Architecture

```text
Vue renderer
  -> preload bridge
  -> Electron main process
  -> chat safety layer
  -> Qwen-compatible streaming API
```

Key files:

| Path | Purpose |
| --- | --- |
| `src/App.vue` | Pet UI, pointer interaction, chat bubble |
| `electron/main.js` | Window, tray, snapping, IPC, Qwen streaming |
| `electron/preload.cjs` | Safe IPC bridge |
| `electron/chatSafety.js` | Key filtering and message bounding |

## Quick Start

```bash
npm install
npm run dev
```

## Build

```bash
npm test
npm run build:renderer
npm run build
```

Windows installer artifacts are written to `release/`.

## AI Key Setup

Option 1: copy `.env.example` to `.env` for local development.

```env
QWEN_API_KEY=YOUR_API_KEY_HERE
```

Option 2: send an `sk-` key in the pet chat box. The app stores it locally and removes key messages from model-bound history.

## Quality Gates

- `npm test` syntax-checks Electron main, preload, and chat safety modules.
- `npm run build:renderer` validates the Vue renderer bundle.
- Release artifacts and local keys are ignored by Git.

## Roadmap

- Add signed auto-update metadata for distributable releases.
- Add persisted pet behavior presets and accessibility controls.
- Add renderer interaction tests for drag, snap, and chat states.

## License

MIT

## Enterprise Readiness

This repository now includes contribution guidelines, a security policy, operational runbook notes, PR review gates, and automated readiness checks. See [docs/ENTERPRISE_READINESS.md](docs/ENTERPRISE_READINESS.md) and [docs/OPERATIONS.md](docs/OPERATIONS.md).
