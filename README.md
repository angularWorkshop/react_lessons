# Topic 15.2: TanStack Query Mutations

Completed solution for the EduTec React course exercise.

## Goal

Replace manual fetch state with TanStack Query and handle mutations correctly.

## Requirements

- load todos through `useQuery`
- add create and delete flows through `useMutation`
- invalidate cache after mutations
- support optimistic updates with rollback on error

## Solution highlights

- query cache should become the single source of truth for the list
- optimistic updates should feel instant but still recover on failure
- mutation side effects should live in TanStack Query handlers

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
