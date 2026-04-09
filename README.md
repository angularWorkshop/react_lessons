# Capstone 2: Dashboard App

Completed solution for the EduTec React capstone.

## Goal

Build a typed dashboard SPA that combines the key ideas from the intermediate React block in one project.

## Requirements

- auth context with sign in, sign out, and protected dashboard content
- TanStack Query for loading users
- filtering, sorting, and pagination in the users table
- edit form built with React Hook Form and Zod
- custom compound `DataTable`
- section-level `ErrorBoundary`
- light and dark theme through context

## What the solution demonstrates

- auth and theme are handled through dedicated contexts with safe hooks
- dashboard access is protected through `RequireAuth`
- users are loaded through TanStack Query with search, sorting, and pagination
- the editor uses `react-hook-form` with `zodResolver`
- the table is exposed through a compound `DataTable` API
- each major section sits behind an `ErrorBoundary`, and the users section can recover with `Try again`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
