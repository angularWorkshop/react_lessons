# Topic 20.1: Component Tree Optimization

Completed solution for the EduTec React course exercise.

## Goal

Eliminate unnecessary re-renders in a deep component tree and verify the result with profiling tools.

## Requirements

- connect `why-did-you-render` in development mode
- keep the tree wrapped in `Profiler`
- stabilize props passed into memoized child components
- make unrelated UI updates stop re-rendering deep leaves
- make all tests pass

## What the solution demonstrates

- `why-did-you-render` is connected through a development-only bootstrap file
- the dashboard tree stays wrapped in `Profiler`
- derived objects and callbacks are stabilized with `useMemo` and `useCallback`
- unrelated banner toggles do not re-render deep memoized leaves
- the runtime UI still exposes inspection and profiler feedback without creating a render loop

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
