# Topic 6.2: Typed Form State

Completed solution for the EduTec React course exercise.

## Goal

Build a typed form state object with `useState`.

## Requirements

- keep the whole form inside `useState<FormState>`
- use one shared `onChange` handler for text and select fields
- update state through computed property names
- keep a live summary card in sync with the form

## Solution highlights

- the form state uses `useState<FormState>`
- one shared `handleChange` works for both `input` and `select`
- updates happen through computed property names

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
