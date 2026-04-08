import { useState, type ReactElement } from 'react';

import { usePrevious } from './hooks/usePrevious';

export function App(): ReactElement {
  const [count, setCount] = useState(5);
  const previousCount = usePrevious(count);

  return (
    <main className="app-shell">
      <div className="hero-card previous-shell">
        <p className="eyebrow">Topic 8.2</p>
        <h1>usePrevious hook</h1>
        <p className="description">
          Track the previous counter value without triggering extra renders.
        </p>

        <div className="previous-grid">
          <div className="metric-card">
            <span>Current value</span>
            <strong>{count}</strong>
          </div>

          <div className="metric-card">
            <span>Previous value</span>
            <strong>{previousCount ?? 'none'}</strong>
          </div>
        </div>

        <div className="counter-actions">
          <button type="button" onClick={() => setCount((current) => current - 1)}>
            Decrease
          </button>
          <button type="button" onClick={() => setCount((current) => current + 1)}>
            Increase
          </button>
        </div>
      </div>
    </main>
  );
}
