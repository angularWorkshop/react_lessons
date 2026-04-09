# Topic 15.1: useFetch with AbortController

Completed solution for the EduTec React course exercise.

## Goal

Build a reusable `useFetch<T>()` hook that prevents request races.

## Requirements

- return `data`, `loading`, and `error`
- cancel the previous request when the URL changes
- prevent stale slow responses from overwriting newer data
- make all tests pass

## Solution highlights

- cleanup should abort the in-flight request
- the hook API should stay generic through `useFetch<T>`
- race conditions should be fixed in the hook, not in the component

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
