# Topic 8.1: Autofocus Search Input

Starter version for the EduTec React course exercise.

## Goal

Forward an input ref through a reusable search component.

## Requirements

- create a `SearchInput` component for the textbox UI
- focus the input from the parent by clicking a button
- type the ref as `React.forwardRef<HTMLInputElement, Props>`
- keep the input fully controlled by React state

## What to finish

- convert the search input to `forwardRef`
- attach the forwarded ref to the native `<input>`
- make the focus button work through `inputRef.current?.focus()`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
