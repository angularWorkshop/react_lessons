# Topic 17.1: withLogger HOC

Completed solution for the EduTec React course exercise.

## Goal

Build a typed `withLogger` higher-order component that logs props on every render.

## Requirements

- implement `withLogger<P>(Component)` as a generic HOC
- keep the wrapped component props fully typed
- assign a readable `displayName` for React DevTools
- make all tests pass

## Solution highlights

- the HOC uses a generic signature to preserve wrapped component props
- `displayName` is derived from the wrapped component for readable DevTools output
- runtime logging stays simple while the public typing remains reusable

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
