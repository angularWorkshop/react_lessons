# Topic 29.1: React 19 API Migration

Starter code for the EduTec React course exercise.

## Goal

Migrate a small workspace from legacy React patterns to the React 19 API surface.

## Requirements

- remove `forwardRef` and pass `ref` as a regular prop
- replace `Context.Provider` with the React 19 provider shorthand
- render page-specific `<title>` and `<meta name="description">` directly from page components
- keep the search focus shortcut working through the custom input
- make all tests pass

## What is incomplete

- the custom input still uses `forwardRef`
- the workspace still renders the old `Context.Provider` wrapper
- the pages do not publish their own metadata yet

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
