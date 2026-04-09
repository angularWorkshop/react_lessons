# Capstone 2: Dashboard App

Starter code for the EduTec React capstone.

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

## What is incomplete

- the starter branch still exposes the dashboard without a real auth gate
- the users table is not implemented as a compound component API yet
- the edit form is missing schema-first validation through `zodResolver`
- the section fallback does not reset the crashed area back into a working state

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
