import { use, type ReactElement } from 'react';

import type { Stats } from '../api/data';

interface StatsPanelProps {
  statsPromise: Promise<Stats>;
}

export function StatsPanel({ statsPromise }: StatsPanelProps): ReactElement {
  const stats = use(statsPromise);

  return (
    <section className="panel">
      <h2>Dashboard stats</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-card__value">{stats.totalUsers}</span>
          <span className="stat-card__label">Total users</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{stats.activeToday}</span>
          <span className="stat-card__label">Active today</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{stats.avgSessionMin}m</span>
          <span className="stat-card__label">Avg session</span>
        </div>
      </div>
    </section>
  );
}
