# Topic 21.1: Lazy Routes

Completed solution for the EduTec React course exercise.

## Goal

Split a route-based app into separate chunks and preload the heaviest route before navigation.

## Requirements

- use `React.lazy` for the heavy route pages
- wrap the route tree in `Suspense` with a route-level skeleton fallback
- preload the analytics route on link hover
- add bundle analysis through `vite build --mode analyze`
- make all tests pass

## What the solution demonstrates

- heavy route pages are loaded through `React.lazy`
- the route tree is wrapped in `Suspense` with a route-level skeleton fallback
- hovering the analytics link triggers a cached preload before navigation
- `npm run build:analyze` produces a split-build report through `rollup-plugin-visualizer`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
