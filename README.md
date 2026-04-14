# Topic 22.2: useInfiniteScroll

Completed solution for the EduTec React course exercise.

## Goal

Build a generic infinite scroll hook that loads the next page through `IntersectionObserver`.

## Requirements

- implement `useInfiniteScroll<T>(fetcher)`
- use `IntersectionObserver` for the sentinel element
- expose `items`, `loading`, `hasMore`, `error`, and `sentinelRef`
- append new items instead of replacing the whole list
- make all tests pass

## What the solution demonstrates

- `useInfiniteScroll<T>` stays generic and works with any page item shape
- the hook loads the first page and appends next pages instead of replacing the list
- `IntersectionObserver` watches the sentinel element and triggers the next fetch
- observer cleanup is handled through `disconnect()` on unmount

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
