# Topic 22.2: useInfiniteScroll

Starter code for the EduTec React course exercise.

## Goal

Build a generic infinite scroll hook that loads the next page through `IntersectionObserver`.

## Requirements

- implement `useInfiniteScroll<T>(fetcher)`
- use `IntersectionObserver` for the sentinel element
- expose `items`, `loading`, `hasMore`, `error`, and `sentinelRef`
- append new items instead of replacing the whole list
- make all tests pass

## What is incomplete

- the hook only loads the first page
- there is no observer-driven next-page loading
- observer cleanup is missing

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
