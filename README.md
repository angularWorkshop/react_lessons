# Topic 9.1: Index Key Bug

Completed solution for the EduTec React course exercise.

## Goal

Reproduce and fix the classic `index as key` bug in a list with local item state.

## Requirements

- keep each row as its own component with internal input state
- type text into an existing row
- prepend a new item to the list
- show why `key={index}` breaks the mapping between state and domain data

## Solution highlights

- the list now uses a stable item id as the key
- each row keeps its own local draft state attached to the same domain item
- the prepend action no longer makes text jump to another row

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
