# Topic 13.1: Expensive Filtering

Completed solution for the EduTec React course exercise.

## Goal

Optimize a large filtered catalog with `useMemo`.

## Requirements

- keep search and sort working on a large item list
- avoid recomputing filtered results on unrelated renders
- use the correct `useMemo` dependency list
- make all tests pass

## Solution highlights

- the expensive filter and sort step should be memoized
- unrelated UI state must not trigger recomputation
- the dependency list should include only values used by the computation

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
