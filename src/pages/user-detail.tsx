import type { ReactElement } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { USERS } from '../data/users';

export function UserDetailPage(): ReactElement {
  // TODO: extract the 'id' param from the URL using useParams
  // TODO: find the matching user in USERS by Number(id)
  // TODO: if user not found, show "User not found"
  // TODO: add a "Back" button that calls navigate(-1)

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = USERS.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <section>
        <h1 className="text-4xl font-black tracking-tight text-white">User not found</h1>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          ← Back
        </button>
      </section>
    );
  }

  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">User #{user.id}</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight text-white">{user.name}</h1>
      <p className="mt-2 text-base text-slate-300">{user.role}</p>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
      >
        ← Back
      </button>
    </section>
  );
}
