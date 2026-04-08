import type { ReactElement } from 'react';

import { Button } from './components/Button';

export function App(): ReactElement {
  return (
    <main className="app-shell">
      <div className="hero-card polymorphic-shell">
        <p className="eyebrow">Topic 5.2</p>
        <h1>Polymorphic button</h1>
        <p className="description">
          Swap the rendered tag while keeping the props API type-safe.
        </p>

        <div className="poly-grid" aria-label="Polymorphic preview">
          <Button as="button" label="Submit form" type="submit" />
          <Button as="a" label="Open docs" href="https://example.com/docs" />
          <Button as="div" label="Static badge" />
        </div>
      </div>
    </main>
  );
}
