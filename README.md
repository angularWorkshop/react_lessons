# Topic 19.1: startTransition Search

Completed solution for the EduTec React course exercise.

## Goal

Keep a large search UI responsive by moving the expensive list update into a transition.

## Requirements

- keep the input value updating immediately
- wrap the expensive search state update in `startTransition`
- expose an `isPending` indicator while the list update is in flight
- make all tests pass

## Solution highlights

- the input value stays urgent while the list update runs inside a transition
- `isPending` exposes transition progress to the UI
- search logic stays typed and reusable while the render path becomes more responsive

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
