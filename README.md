# Topic 10.1: Async View Component

Starter version for the EduTec React course exercise.

## Goal

Build a reusable component that renders idle, loading, success, and error states.

## Requirements

- use a discriminated union `AsyncState<T>`
- render the correct UI branch for each state
- show a skeleton block for loading
- show a retry button for error

## What to finish

- make `AsyncView` generic instead of tying it to one concrete data shape
- wire the retry button to the callback from props
- add an exhaustive state check so TypeScript guards every status branch

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
