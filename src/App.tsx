import type { ReactElement } from 'react';

import { CreateElementGreeting } from './components/CreateElementGreeting';
import { JsxGreeting } from './components/JsxGreeting';

export function App(): ReactElement {
  return (
    <main className="app-shell">
      <div className="hero-card lesson-card">
        <p className="eyebrow">Topic 2.1</p>
        <h1>JSX and createElement</h1>
        <p className="description">
          Compare a JSX component with its manual React equivalent.
        </p>

        <div className="comparison-grid">
          <section className="comparison-panel" aria-label="JSX example">
            <p className="panel-label">JSX version</p>
            <JsxGreeting />
          </section>

          <section
            className="comparison-panel"
            aria-label="createElement example"
            data-testid="manual-section"
          >
            <p className="panel-label">Manual version</p>
            <CreateElementGreeting />
          </section>
        </div>
      </div>
    </main>
  );
}
