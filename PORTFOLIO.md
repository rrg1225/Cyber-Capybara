# Portfolio Brief: Capybara Desktop Pet

## Resume Bullets

- Built an Electron + Vue desktop companion with transparent always-on-top windows, drag interactions, edge snapping, tray controls, sound feedback, and optional Qwen chat.
- Implemented local key storage through `electron-store` and a small preload IPC bridge with `contextIsolation` and sandboxing.
- Packaged a Windows desktop workflow with Electron Builder while keeping renderer verification lightweight in CI.

## What This Proves

- Desktop app development with Electron, Vue, and native shell integration.
- Secure renderer/main-process boundaries and IPC design.
- Product polish through animation, sound, tray, and window behavior.

## Verification

```bash
npm ci
npm run build:renderer
```

Full installer packaging is available through:

```bash
npm run build
```

## Interview Talking Points

- Why Electron apps need strict IPC boundaries.
- How transparent desktop windows differ from standard web apps.
- How local API key capture avoids shipping secrets in `.env`.
