# Enterprise Architecture

## Enterprise Positioning

Capybara Desktop Pet is an Electron desktop companion. Beyond the playful surface, it demonstrates enterprise-relevant desktop concerns: main/renderer process separation, local secret storage, tray integration, transparent window behavior, packaging, and secure IPC boundaries.

## Architecture Boundaries

- **Renderer**: Vue UI, animation, interaction state, and chat surface.
- **Main process**: Electron window lifecycle, tray, shortcuts, and native shell integration.
- **Preload bridge**: narrow IPC surface exposed to the renderer.
- **Local storage**: `electron-store` for local settings and optional Qwen API key.
- **Packaging layer**: Electron Builder Windows installer workflow.

## Enterprise Extension Path

1. Add signed auto-update channels for stable/beta releases.
2. Add crash telemetry with explicit user opt-in.
3. Add encrypted local settings storage for secrets.
4. Add enterprise policy controls for disabling AI chat or external network calls.
5. Add cross-platform packaging and notarization for macOS.

## SLO and Observability

- **Startup target**: renderer interactive within 2 seconds on ordinary laptops.
- **Crash target**: main-process crash-free sessions above 99.5%.
- **Interaction target**: drag and edge snapping should remain responsive under normal desktop load.
- **Core dashboards for production**: crash count, startup time, update failures, chat provider failures.

## Security Model

- Renderer uses a small preload bridge instead of direct Node access.
- `contextIsolation` and sandboxing reduce renderer compromise impact.
- API keys are stored locally, not committed or shipped in `.env`.
- Future enterprise mode should encrypt local secrets and support policy-managed configuration.

## Interview-Level Design Rationale

The project is useful to discuss because Electron apps have a different threat model from web apps. The main design focus is keeping native capabilities in the main process and exposing only narrow, reviewable IPC calls.
