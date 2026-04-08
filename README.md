# Topic 8.2: usePrevious Hook

Completed solution for the EduTec React course exercise.

## Goal

Implement a generic `usePrevious<T>()` hook with `useRef`.

## Requirements

- expose `usePrevious<T>(value: T): T | undefined`
- store the previous value without causing extra re-renders
- show the current and previous counter values in the UI
- keep the hook generic for any value type

## Solution highlights

- `usePrevious<T>()` stays generic
- the hook stores state in a ref instead of a new render-triggering value
- the previous value updates after render through `useEffect`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
