# Topic 28.1: Suspense-driven Data Loading

Lesson branch for the EduTec React course exercise.

## Goal

Wire Suspense boundaries and ErrorBoundary around components that call `use()` to read promises.

## Requirements

- wrap `StatsPanel` in its own `Suspense` with a `Skeleton` fallback
- wrap `UserList` in its own `Suspense` with a `Skeleton` fallback
- wrap both in `ErrorBoundary` for error handling
- no manual `loading` state — Suspense handles it
- each section loads independently

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
