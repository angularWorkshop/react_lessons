# Topic 5.2: Polymorphic Button

Starter branch for the EduTec React exercise about discriminated union props.

## Task

Build a polymorphic `Button` component with:

- `as?: 'button' | 'a' | 'div'`
- `href` only for anchor mode
- `type` only for button mode
- type-safe prop suggestions depending on `as`

## What to change

- replace the loose prop model with a discriminated union
- forbid `href` on button mode
- forbid `type` on anchor mode
- keep the preview page visually unchanged

## Expected checks

- the preview renders all supported modes
- the component source contains discriminated union props
- `href?: never` and `type?: never` are used to block invalid combinations
- `npm run check` passes
