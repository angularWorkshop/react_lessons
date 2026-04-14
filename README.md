# Topic 23.1: FSD Refactor

Solution branch for the EduTec React course exercise.

## Goal

Refactor a working dashboard into a cleaner Feature-Sliced Design structure.

## Requirements

- keep the app split into `pages/widgets/features/entities`
- expose slice public APIs through `index.ts`
- route cross-slice imports through those public APIs
- let ESLint catch deep imports into another slice's internal segments
- keep the runtime behavior unchanged while making the checks pass

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run check`

## What changed in the answer

- `App` imports the page from `src/pages/dashboard-page`
- widgets import features and entities through slice roots
- the search feature re-exports its model and UI from a public API
- the user entity re-exports its types, data, and table from a public API
- ESLint blocks deep imports so the structure does not quietly drift back
