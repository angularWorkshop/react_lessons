# Topic 22.1: Hooks Library

Completed solution for the EduTec React course exercise.

## Goal

Design a reusable hooks library instead of scattering browser-specific logic across components.

## Requirements

- implement `useLocalStorage<T>(key, defaultValue)`
- implement `useMediaQuery(query: string): boolean`
- implement `useClickOutside(ref, handler)`
- keep each hook in a dedicated file
- make all tests pass

## What the solution demonstrates

- `useLocalStorage<T>` keeps generic state in sync with `localStorage`
- `useMediaQuery` reacts to browser media query changes through `matchMedia`
- `useClickOutside` handles document-level pointer events with cleanup
- each hook stays reusable and isolated from component-specific UI concerns

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
