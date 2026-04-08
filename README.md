# Topic 4.1: Typed Button Props

Starter branch for the EduTec React exercise about typed props.

## Task

Build a reusable `Button` component with:

- `variant: 'primary' | 'secondary' | 'danger'`
- `size: 'sm' | 'md' | 'lg'`
- inherited native `<button>` attributes
- `...rest` forwarding to the real button element

## What to change

- type props through a dedicated interface
- inherit native button attributes with `ComponentPropsWithoutRef<'button'>`
- forward extra props to the HTML button
- keep the preview page visually consistent

## Expected checks

- the preview page renders all button variants
- native button props such as `disabled` and `aria-label` work
- the component source uses `ComponentPropsWithoutRef<'button'>`
- `npm run check` passes
