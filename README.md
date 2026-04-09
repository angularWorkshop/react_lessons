# Topic 17.1: withLogger HOC

Starter code for the EduTec React course exercise.

## Goal

Build a typed `withLogger` higher-order component that logs props on every render.

## Requirements

- implement `withLogger<P>(Component)` as a generic HOC
- keep the wrapped component props fully typed
- assign a readable `displayName` for React DevTools
- make all tests pass

## What is incomplete

- the current HOC logs props but does not preserve prop types through a generic API
- the wrapped component does not expose a readable `displayName`
- the implementation still behaves like a rough wrapper instead of a reusable typed utility

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
