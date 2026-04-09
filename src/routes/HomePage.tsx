import type { ReactElement } from 'react';

export function HomePage(): ReactElement {
  return (
    <section className="route-panel">
      <p className="eyebrow">Home route</p>
      <h2>Operations dashboard</h2>
      <p>
        This page should stay in the initial bundle. Heavy analytics and reports views should be loaded separately.
      </p>
    </section>
  );
}
