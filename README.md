# Topic 8.2: usePrevious Hook

Starter version for the EduTec React course exercise.

## Goal

Implement a generic `usePrevious<T>()` hook with `useRef`.

## Requirements

- expose `usePrevious<T>(value: T): T | undefined`
- store the previous value without causing extra re-renders
- show the current and previous counter values in the UI
- keep the hook generic for any value type

## What to finish

- switch the hook to `useRef`
- update the ref after render in an effect
- return the previous value instead of the current one

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
