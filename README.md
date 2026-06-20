# Capybara Desktop Pet

A lightweight desktop pet built with Vue, Vite, and Electron. The app renders a draggable animated companion with sound effects and local desktop-window behavior.

## Features

- Vue 3 renderer powered by Vite.
- Electron shell for desktop floating-window behavior.
- Local media assets for animation and interaction sounds.
- Optional Qwen API key configuration through `.env` for future AI interaction features.

## Quick Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build:renderer
npm run build
```

## Environment

Copy `.env.example` to `.env` if you want to enable API-backed features.

```env
QWEN_API_KEY=YOUR_API_KEY_HERE
```

## Repository Topics

`electron`, `vue`, `vite`, `desktop-pet`, `desktop-app`
