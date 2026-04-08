import { useState, type ReactElement } from 'react';

import { useDocumentTitle } from './hooks/useDocumentTitle';

export function App(): ReactElement {
  const [count, setCount] = useState(3);

  useDocumentTitle(`Clicks: ${count}`);

  return (
    <main className="app-shell">
      <div className="hero-card title-shell">
        <p className="eyebrow">Topic 7.1</p>
        <h1>Document title sync</h1>
        <p className="description">
          Keep the page title in sync with the counter through a custom effect hook.
        </p>

        <div className="counter-card" aria-label="Counter panel">
          <span className="counter-label">Current count</span>
          <strong className="counter-value">{count}</strong>

          <div className="counter-actions">
            <button type="button" onClick={() => setCount((current) => current - 1)}>
              Decrease
            </button>
            <button type="button" onClick={() => setCount((current) => current + 1)}>
              Increase
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
