# Topic 7.2: WebSocket Subscription

Starter version for the EduTec React course exercise.

## Goal

Manage a socket-like subscription with `useEffect`.

## Requirements

- connect to the selected URL through the fake socket helper
- receive messages over time
- reconnect when the URL changes
- disconnect in cleanup to avoid leaks

## What to finish

- fix the effect dependency array so it reacts to `selectedUrl`
- return cleanup that closes the current connection
- keep the message feed and lifecycle log in sync with the active URL

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run check`
