import type { ReactElement } from 'react';

export function App(): ReactElement {
  return (
    <main className="app-shell">
      <div className="hero-card">
        <p className="eyebrow">EduTec React Bootcamp</p>
        <h1>React + TypeScript starter</h1>
        <p className="description">
          This repository is the baseline for the React exercises.
        </p>
      </div>
    </main>
  );
}
