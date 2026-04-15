import type { ReactElement } from 'react';

import { useNavigate } from 'react-router-dom';

import { USERS } from '../data/users';

export function UsersPage(): ReactElement {
  const navigate = useNavigate();

  return (
    <section>
      <h1 className="text-4xl font-black tracking-tight text-white">Users</h1>
      <ul className="mt-6 space-y-3">
        {USERS.map((user) => (
          <li key={user.id}>
            <button
              onClick={() => {
                navigate('/user-profile', { state: { user } });
              }}
              className="w-full text-left rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white transition hover:bg-white/10"
            >
              <span className="font-semibold">{user.name}</span>
              <span className="ml-3 text-sm text-slate-400">{user.role}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
