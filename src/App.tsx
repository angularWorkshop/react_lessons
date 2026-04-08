import type { ReactElement } from 'react';

import { Button } from './components/Button';

export function App(): ReactElement {
  return (
    <main className="app-shell">
      <div className="hero-card button-demo-shell">
        <p className="eyebrow">Topic 4.1</p>
        <h1>Typed button props</h1>
        <p className="description">
          Build a button API that combines design variants with native HTML button behavior.
        </p>

        <div className="button-demo" aria-label="Button preview">
          <Button label="Save profile" variant="primary" size="lg" />
          <Button label="Open draft" variant="secondary" size="md" />
          <Button label="Delete item" variant="danger" size="sm" />
          <Button label="Sync disabled state" variant="secondary" size="md" disabled aria-label="Disabled sync" />
        </div>
      </div>
    </main>
  );
}
