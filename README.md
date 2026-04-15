# Topic 34.2: Passing State Through Navigate

Solution branch for the EduTec React course exercise.

## Goal

Pass data between pages using `navigate`'s state option and read it on the target page with `useLocation`.

## Requirements

- pass user data through `navigate('/user-profile', { state: { user } })`
- read state on the profile page via `useLocation().state`
- type the state properly
- handle the case when state is missing (direct URL access)
- show a "Select a user" fallback when no state is present

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
