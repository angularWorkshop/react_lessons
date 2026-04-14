# Topic 22.1: Hooks Library

Starter code for the EduTec React course exercise.

## Goal

Design a reusable hooks library instead of scattering browser-specific logic across components.

## Requirements

- implement `useLocalStorage<T>(key, defaultValue)`
- implement `useMediaQuery(query: string): boolean`
- implement `useClickOutside(ref, handler)`
- keep each hook in a dedicated file
- make all tests pass

## What is incomplete

- `useLocalStorage` does not read from or write to `localStorage`
- `useMediaQuery` does not subscribe to browser media query updates
- `useClickOutside` does not attach a document-level listener

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
