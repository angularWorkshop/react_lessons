# Topic 11.1: Controlled Signup Form

Completed solution for the EduTec React course exercise.

## Goal

Build a fully controlled registration form with typed event handlers.

## Requirements

- keep every field in React state
- validate on blur and on submit
- type `onChange`, `onBlur`, and `onSubmit` handlers explicitly
- show a success summary after a valid submit

## Solution highlights

- the form state lives in a single `RegistrationValues` object
- field and form validation reuse shared helper functions
- input, select, blur, and submit events stay strictly typed
- blur handlers surface errors immediately instead of waiting for submit
- valid submit renders a summary card with the typed form payload

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
