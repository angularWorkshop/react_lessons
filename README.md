# Topic 10.1: Async View Component

Completed solution for the EduTec React course exercise.

## Goal

Build a reusable component that renders idle, loading, success, and error states.

## Requirements

- use a discriminated union `AsyncState<T>`
- render the correct UI branch for each state
- show a skeleton block for loading
- show a retry button for error

## Solution highlights

- `AsyncView<T>` stays generic and works with any success payload type
- the error branch calls the provided retry callback
- the status switch includes an exhaustive `never` check

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
