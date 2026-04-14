# Topic 30.2: Dark Theme with CSS Custom Properties

Solution branch for the EduTec React course exercise.

## Goal

Implement light/dark theme switching using CSS Custom Properties and `data-theme` attribute.

## Requirements

- define color variables on `:root` (--color-bg, --color-surface, --color-text, etc.)
- override them under `[data-theme="dark"]` selector
- toggle the theme by setting `data-theme` attribute on `document.documentElement`
- components use `var(--color-xxx)` — no hardcoded color values
- theme toggle button switches between light and dark

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
