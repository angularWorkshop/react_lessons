# Topic 12.2: Reducer State Machine

Completed solution for the EduTec React course exercise.

## Goal

Model async loading as a reducer-driven state machine.

## Requirements

- describe idle, loading, success, and error as explicit states
- drive transitions through reducer actions
- block invalid transitions such as `error -> success` without reset
- render the current state in the UI

## Solution highlights

- keep transitions pure and centralized inside the reducer
- make valid actions depend on the current status
- render only the controls that match the active state

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
