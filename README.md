# Topic 1.2: ESLint, Prettier, and Pre-Commit Checks

Add the first real code quality workflow to the React starter repository.

Current lesson state:

- the app itself is working
- quality tooling is partially wired
- a demo component still violates React Hook rules and formatting expectations
- the pre-commit flow is not complete yet

Your task:

1. Finish the ESLint setup for TypeScript and React Hooks.
2. Configure Prettier and make `format:check` pass.
3. Add Husky + lint-staged so code quality checks can run before commits.
4. Fix the demo component so hook dependencies and formatting are valid.

Acceptance criteria:

- `npm run lint` passes
- `npm run format:check` passes
- `npm run check` passes
- `.husky/pre-commit` runs `lint-staged`

Local check:

```bash
PATH="$HOME/.nvm/versions/node/v24.13.0/bin:$PATH" \
~/.nvm/versions/node/v24.13.0/bin/node \
~/.nvm/versions/node/v24.13.0/lib/node_modules/npm/bin/npm-cli.js run check
```
