# Topic 13.2: Memoized Child Actions

Completed solution for the EduTec React course exercise.

## Goal

Keep a memoized child stable with `useCallback`.

## Requirements

- wrap the child component with `React.memo`
- keep unrelated parent state changes from re-rendering the child
- stabilize the callback prop correctly
- make all tests pass

## Solution highlights

- the child should re-render only when relevant props change
- the callback identity should stay stable across unrelated renders
- the render counter should prove the optimization works

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
