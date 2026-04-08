# Topic 5.1: Generic List Component

Starter branch for the EduTec React exercise about generic props.

## Task

Build a reusable `List<T>` component that supports:

- `items: T[]`
- `renderItem: (item: T) => ReactNode`
- optional `keyExtractor: (item: T) => string`

## What to change

- turn the current list implementation into a generic component
- keep it reusable for both `User[]` and `Product[]`
- type `renderItem` through the same `T`
- keep the runtime preview unchanged

## Expected checks

- the page renders both data sets
- `List<T>` is generic instead of hardcoded to one item shape
- `renderItem` and `keyExtractor` use `T`
- `npm run check` passes
