# Topic 35.1: Layout with Outlet and Nested Routes

Lesson branch for the EduTec React course exercise.

## Goal

Build a layout system using nested routes and `Outlet`. Main layout has Header + Sidebar, auth layout has only Header. Dashboard uses nested routes with an index route.

## Requirements

- create `MainLayout` with Header, Sidebar, and `<Outlet />`
- create `AuthLayout` with Header only and `<Outlet />`
- nest dashboard routes: `/dashboard`, `/dashboard/stats`, `/dashboard/users`
- `/dashboard` shows an index route with a welcome message
- `/login` renders inside `AuthLayout`
- Header stays mounted across navigation (no remount)

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
