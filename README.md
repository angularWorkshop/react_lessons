# Topic 12.1: Cart Reducer

Completed solution for the EduTec React course exercise.

## Goal

Refactor the shopping cart from `useState` to `useReducer`.

## Requirements

- move cart transitions into a pure reducer
- dispatch typed actions for add, remove, quantity updates, and clear
- keep reducer logic immutable and side-effect free
- cover reducer behavior with tests

## Solution highlights

- the UI dispatches actions instead of mutating cart state directly
- the reducer remains a pure function that returns fresh arrays
- the action model should become a discriminated union

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
