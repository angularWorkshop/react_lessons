# Topic 18.1: Global Error Boundary

Starter code for the EduTec React course exercise.

## Goal

Wrap the app routes in an error boundary with a fallback UI and a working retry flow.

## Requirements

- catch rendering errors inside a global `ErrorBoundary`
- show a readable fallback screen instead of a broken tree
- wire the `Try again` button so the boundary can recover
- log the captured error to the console as a Sentry-like placeholder
- make all tests pass

## What is incomplete

- the fallback UI appears, but retry does not recover the app
- the boundary does not log captured errors yet
- the implementation is missing the full reset flow expected from a reusable boundary

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
