# Topic 1.1: Vite + React + TypeScript Starter

Prepare the first reusable starter for the React course.

Current lesson state:

- the project already runs on Vite
- TypeScript is enabled
- the baseline app renders successfully
- configuration is still incomplete for the rest of the course

Your task:

1. Enable `noUncheckedIndexedAccess` in the app tsconfig.
2. Add the `@/* -> src/*` path alias.
3. Configure the same alias in `vite.config.ts`.
4. Replace the inline app markup with a dedicated `AppShell` component.
5. Import `AppShell` through the alias instead of a relative path.

Acceptance criteria:

- `npm run typecheck` passes
- `npm run build` passes
- `npm run test` passes
- `App` imports `AppShell` from `@/components/AppShell`

Local check:

```bash
PATH="$HOME/.nvm/versions/node/v24.13.0/bin:$PATH" \
~/.nvm/versions/node/v24.13.0/bin/node \
~/.nvm/versions/node/v24.13.0/lib/node_modules/npm/bin/npm-cli.js run check
```
