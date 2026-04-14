import type { ReactElement } from 'react';

import { users } from '../../../entities/user/model/types';
import { useUserSearch } from '../../../features/user-search/model/use-user-search';
import { OverviewPanel } from '../../../widgets/overview-panel/ui/overview-panel';
import { UsersPanel } from '../../../widgets/users-panel/ui/users-panel';

export function DashboardPage(): ReactElement {
  const { query, setQuery, filteredUsers } = useUserSearch(users);

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">Topic 23.1</p>
        <h1>FSD refactor workspace</h1>
        <p>
          The dashboard works, but its imports still reach straight into internal folders instead of using public APIs.
        </p>
      </header>

      <div className="dashboard-grid">
        <OverviewPanel users={filteredUsers} />
        <UsersPanel users={filteredUsers} query={query} onQueryChange={setQuery} />
      </div>
    </main>
  );
}
