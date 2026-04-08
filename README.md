# Topic 2.1: JSX to JS and Back Again

Starter branch for the EduTec React exercise about JSX internals.

## Task

You need to finish a tiny comparison screen that shows:

- a JSX component
- a manual version built through `React.createElement`
- the same rendered content in both cases
- a `Fragment` instead of an unnecessary wrapper node

## What to change

- rewrite `CreateElementGreeting` without JSX
- use `React.createElement(...)` for the manual variant
- replace the extra wrapper with `React.Fragment`
- keep the rendered text identical to the JSX version

## Expected checks

- the JSX and manual versions render the same copy
- the manual version does not introduce an extra wrapper element
- `npm run check` passes
