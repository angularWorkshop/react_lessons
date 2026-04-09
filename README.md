# Topic 18.1: Global Error Boundary

Completed solution for the EduTec React course exercise.

## Goal

Wrap the app routes in an error boundary with a fallback UI and a working retry flow.

## Requirements

- catch rendering errors inside a global `ErrorBoundary`
- show a readable fallback screen instead of a broken tree
- wire the `Try again` button so the boundary can recover
- log the captured error to the console as a Sentry-like placeholder
- make all tests pass

## Solution highlights

- the boundary catches render errors through a class-based API
- retry resets the boundary and lets the route recover cleanly
- `componentDidCatch` logs the error as a lightweight Sentry-style placeholder

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
