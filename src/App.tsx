import { Suspense, useMemo, type ReactElement } from 'react';

import { fetchStats, fetchUsers } from './api/data';
import { ErrorBoundary } from './components/error-boundary';
import { Skeleton } from './components/skeleton';
import { StatsPanel } from './components/stats-panel';
import { UserList } from './components/user-list';

export function App(): ReactElement {
  // Create promises once per App mount.
  // Each child that calls use() on them will suspend until resolved.
  const usersPromise = useMemo(() => fetchUsers(), []);
  const statsPromise = useMemo(() => fetchStats(), []);

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
          <ErrorBoundary fallback={<div className="error-fallback">Failed to load stats</div>}>
            <Suspense fallback={<Skeleton label="Loading stats" />}>
              <StatsPanel statsPromise={statsPromise} />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary fallback={<div className="error-fallback">Failed to load users</div>}>
            <Suspense fallback={<Skeleton label="Loading users" />}>
              <UserList usersPromise={usersPromise} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </section>
    </main>
  );
}
