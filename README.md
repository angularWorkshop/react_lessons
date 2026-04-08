# Topic 7.1: Document Title Sync

Completed solution for the EduTec React course exercise.

## Goal

Synchronize `document.title` with component state through `useEffect`.

## Requirements

- update the page title when the counter changes
- move the effect logic into `useDocumentTitle(title: string)`
- restore the original title when the component unmounts
- keep the hook safe under StrictMode remounting

## Solution highlights

- `useDocumentTitle(title: string)` owns the effect logic
- cleanup restores the previous title on unmount
- the counter keeps the current title derived from React state

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
