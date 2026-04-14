import type { ReactElement } from 'react';

import type { User } from '../../../entities/user';

interface OverviewPanelProps {
  users: User[];
}

export function OverviewPanel({ users }: OverviewPanelProps): ReactElement {
  const activeCount = users.filter((user) => user.status === 'active').length;

  return (
    <section className="panel">
      <p className="eyebrow">Overview</p>
      <h2>Dashboard health</h2>
      <p>Total users: {users.length}</p>
      <p>Active users: {activeCount}</p>
    </section>
  );
}
