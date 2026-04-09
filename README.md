# Topic 19.1: startTransition Search

Starter code for the EduTec React course exercise.

## Goal

Keep a large search UI responsive by moving the expensive list update into a transition.

## Requirements

- keep the input value updating immediately
- wrap the expensive search state update in `startTransition`
- expose an `isPending` indicator while the list update is in flight
- make all tests pass

## What is incomplete

- the search query still updates synchronously
- the component does not show a pending state yet
- the implementation does not distinguish urgent input updates from low-priority list work

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
