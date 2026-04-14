import type { ReactElement } from 'react';

import type { User } from '../../../entities/user/model/types';
import { UserTable } from '../../../entities/user/ui/user-table';
import { UserSearch } from '../../../features/user-search/ui/user-search';

interface UsersPanelProps {
  users: User[];
  query: string;
  onQueryChange: (nextQuery: string) => void;
}

export function UsersPanel({ users, query, onQueryChange }: UsersPanelProps): ReactElement {
  return (
    <section className="panel panel--wide">
      <p className="eyebrow">Users</p>
      <h2>User access matrix</h2>
      <UserSearch query={query} onChange={onQueryChange} />
      <UserTable users={users} />
    </section>
  );
}
