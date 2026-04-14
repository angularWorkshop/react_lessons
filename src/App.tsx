import type { ReactElement } from 'react';

import { fetchStats, fetchUsers } from './api/data';
import { StatsPanel } from './components/stats-panel';
import { UserList } from './components/user-list';

// These promises are created once at module level.
// Each component that calls use() on them will suspend
// until the data resolves.
const usersPromise = fetchUsers();
const statsPromise = fetchStats();

// TODO: import { Suspense } from 'react'
// TODO: import { ErrorBoundary } from './components/error-boundary'
// TODO: import { Skeleton } from './components/skeleton'

export function App(): ReactElement {
  return (
    <main className="app-shell">
      <section className="workspace">
        <p className="workspace__eyebrow">Topic 28.1</p>
        <h1>Suspense dashboard</h1>
        <p className="workspace__description">
          Wrap each data section in its own Suspense boundary with a Skeleton fallback,
          plus an ErrorBoundary for error handling.
        </p>

        <div className="dashboard-grid">
          {/* TODO: wrap StatsPanel in ErrorBoundary + Suspense with Skeleton fallback */}
          <StatsPanel statsPromise={statsPromise} />

          {/* TODO: wrap UserList in ErrorBoundary + Suspense with Skeleton fallback */}
          <UserList usersPromise={usersPromise} />
        </div>
      </section>
    </main>
  );
}
