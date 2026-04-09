# Topic 14.1: Theme Context

Completed solution for the EduTec React course exercise.

## Goal

Model application theme with a typed context and a safe custom hook.

## Requirements

- create `ThemeContext` with `theme` and `toggleTheme`
- expose a typed `useTheme()` hook
- throw when a consumer is rendered outside the provider
- avoid passing theme props through intermediate components

## Solution highlights

- context should remove prop drilling for global theme state
- the custom hook should return a non-optional typed value
- consumers should fail fast when used outside the provider tree

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
