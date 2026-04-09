# Topic 19.2: useDeferredValue

Completed solution for the EduTec React course exercise.

## Goal

Defer a heavy list update while keeping the current input value urgent.

## Requirements

- derive a deferred value from the query with `useDeferredValue`
- render the heavy list from the deferred query instead of the urgent one
- expose a stale UI state while deferred results are catching up
- make all tests pass

## Solution highlights

- the heavy list reads from a deferred query instead of the urgent one
- stale UI is surfaced visually while deferred results are catching up
- the example shows how deferring differs from simply delaying input updates

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
