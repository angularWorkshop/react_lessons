import type { ReactElement } from 'react';

const analyticsCards = [
  { id: 'a-1', title: 'Traffic sources', value: '18,240 visits' },
  { id: 'a-2', title: 'Conversion lift', value: '+12.4%' },
  { id: 'a-3', title: 'Campaign ROI', value: '3.8x' },
  { id: 'a-4', title: 'Retention cohort', value: '68%' },
];

export function AnalyticsPage(): ReactElement {
  return (
    <section className="route-panel route-panel--heavy">
      <p className="eyebrow">Analytics route</p>
      <h2>Analytics control room</h2>
      <p>This route simulates a heavy page that should become its own chunk.</p>
      <div className="stats-grid">
        {analyticsCards.map((card) => (
          <article key={card.id} className="stat-card">
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
