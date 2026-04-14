import type { ReactElement } from 'react';

import { users, useUserSearch } from '../../../features/user-search';
import { OverviewPanel } from '../../../widgets/overview-panel';
import { UsersPanel } from '../../../widgets/users-panel';

export function DashboardPage(): ReactElement {
  const { query, setQuery, filteredUsers } = useUserSearch(users);

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">Topic 23.1</p>
        <h1>FSD refactor workspace</h1>
        <p>
          The dashboard still works, but now each slice talks through a public API instead of poking around in its
          neighbors&apos; private folders.
        </p>
      </header>

      <div className="dashboard-grid">
        <OverviewPanel users={filteredUsers} />
        <UsersPanel users={filteredUsers} query={query} onQueryChange={setQuery} />
      </div>
    </main>
  );
}
