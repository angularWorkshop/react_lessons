# Topic 7.1: Document Title Sync

Starter version for the EduTec React course exercise.

## Goal

Synchronize `document.title` with component state through `useEffect`.

## Requirements

- update the page title when the counter changes
- move the effect logic into `useDocumentTitle(title: string)`
- restore the original title when the component unmounts
- keep the hook safe under StrictMode remounting

## What to finish

- add cleanup to the hook
- make the hook preserve the previous title before overwriting it
- keep the counter UI controlled by React state

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
