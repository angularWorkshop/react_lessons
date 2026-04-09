# Topic 20.1: Component Tree Optimization

Starter code for the EduTec React course exercise.

## Goal

Eliminate unnecessary re-renders in a deep component tree and verify the result with profiling tools.

## Requirements

- connect `why-did-you-render` in development mode
- keep the tree wrapped in `Profiler`
- stabilize props passed into memoized child components
- make unrelated UI updates stop re-rendering deep leaves
- make all tests pass

## What is incomplete

- the tree is memoized, but unstable object and function props still force deep re-renders
- the profiler is mounted, but the component graph still updates more often than necessary
- `why-did-you-render` is connected, but the render causes have not been removed yet

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
