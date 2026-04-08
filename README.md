# Topic 8.1: Autofocus Search Input

Completed solution for the EduTec React course exercise.

## Goal

Forward an input ref through a reusable search component.

## Requirements

- create a `SearchInput` component for the textbox UI
- focus the input from the parent by clicking a button
- type the ref as `React.forwardRef<HTMLInputElement, Props>`
- keep the input fully controlled by React state

## Solution highlights

- `SearchInput` is typed with `forwardRef<HTMLInputElement, SearchInputProps>`
- the forwarded ref points to the native input element
- the parent focuses the field with `inputRef.current?.focus()`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
