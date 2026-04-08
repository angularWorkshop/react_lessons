import type { ReactElement } from 'react';

export function AppShell(): ReactElement {
  return (
    <main className="app-shell">
      <div className="hero-card">
        <p className="eyebrow">EduTec React Bootcamp</p>
        <h1>React Bootcamp starter</h1>
        <p className="description">
          A clean Vite + React + TypeScript template for the first course topics.
        </p>
      </div>
    </main>
  );
}
