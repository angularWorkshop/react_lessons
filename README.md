# Topic 9.1: Index Key Bug

Starter version for the EduTec React course exercise.

## Goal

Reproduce and fix the classic `index as key` bug in a list with local item state.

## Requirements

- keep each row as its own component with internal input state
- type text into an existing row
- prepend a new item to the list
- show why `key={index}` breaks the mapping between state and domain data

## What to finish

- replace the unstable list key with a real unique item id
- keep each row's local input state attached to the same logical item after prepend
- leave a short comment explaining why the id key is required here

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
