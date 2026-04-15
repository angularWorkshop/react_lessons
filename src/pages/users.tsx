import type { ReactElement } from 'react';

import { Link } from 'react-router-dom';

import { USERS } from '../data/users';

export function UsersPage(): ReactElement {
  return (
    <section>
      <h1 className="text-4xl font-black tracking-tight text-white">Users</h1>
      <ul className="mt-6 space-y-3">
        {USERS.map((user) => (
          <li key={user.id}>
            <Link
              to={`/users/${user.id}`}
              className="block rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white transition hover:bg-white/10"
            >
              <span className="font-semibold">{user.name}</span>
              <span className="ml-3 text-sm text-slate-400">{user.role}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
