# Topic 19.2: useDeferredValue

Starter code for the EduTec React course exercise.

## Goal

Defer a heavy list update while keeping the current input value urgent.

## Requirements

- derive a deferred value from the query with `useDeferredValue`
- render the heavy list from the deferred query instead of the urgent one
- expose a stale UI state while deferred results are catching up
- make all tests pass

## What is incomplete

- the list still renders from the urgent query directly
- stale UI is not indicated visually yet
- the component does not demonstrate the difference between urgent input and deferred list work

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
