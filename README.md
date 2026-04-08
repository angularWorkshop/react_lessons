# Topic 4.2: Children and Typed Callbacks

Starter branch for the EduTec React exercise about `children` and typed props.

## Task

Build two typed components:

- `Card` with `title`, optional `footer`, and `children`
- `Modal` with `isOpen`, `onClose`, and `children`

## What to change

- type `children` as `ReactNode`
- keep `footer` optional
- type `onClose` as `() => void`
- render `Modal` only when `isOpen` is `true`

## Expected checks

- `Card` and `Modal` work together in the preview
- `children` is typed correctly
- the close action uses a typed callback
- `npm run check` passes
