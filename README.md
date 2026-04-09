# Topic 21.1: Lazy Routes

Starter code for the EduTec React course exercise.

## Goal

Split a route-based app into separate chunks and preload the heaviest route before navigation.

## Requirements

- use `React.lazy` for the heavy route pages
- wrap the route tree in `Suspense` with a route-level skeleton fallback
- preload the analytics route on link hover
- add bundle analysis through `vite build --mode analyze`
- make all tests pass

## What is incomplete

- the route pages are still imported eagerly into the initial bundle
- there is no `Suspense` boundary around the route tree
- hovering the analytics link does not trigger any preload
- bundle analysis is not configured

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
