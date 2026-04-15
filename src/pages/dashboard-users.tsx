import type { ReactElement } from 'react';

import { USERS } from '../data/users';

export function DashboardUsersPage(): ReactElement {
  return (
    <section>
      <h1 className="text-4xl font-black tracking-tight text-white">Users</h1>
      <ul className="mt-6 space-y-3">
        {USERS.map((user) => (
          <li
            key={user.id}
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white"
          >
            <span className="font-semibold">{user.name}</span>
            <span className="ml-3 text-sm text-slate-400">{user.role}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
