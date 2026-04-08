import type { ReactElement } from 'react';

import { HookRulesDemo } from './components/HookRulesDemo';

export function App(): ReactElement {
  return (
    <main className="app-shell">
      <div className="hero-card">
        <p className="eyebrow">Quality checks starter</p>
        <h1>React code quality</h1>
        <p className="description">Finish linting, formatting, and pre-commit automation.</p>
        <HookRulesDemo />
      </div>
    </main>
  );
}
