# Topic 14.2: Auth Context

Completed solution for the EduTec React course exercise.

## Goal

Model auth state with context and guard protected UI with `RequireAuth`.

## Requirements

- keep `user`, `login`, and `logout` inside auth context
- split auth state and auth actions for better consumer performance
- redirect guests away from protected content
- make all tests pass

## Solution highlights

- auth state and auth actions should not live in the same context
- protected UI should render only for authenticated users
- `RequireAuth` should make the redirect behavior explicit

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
