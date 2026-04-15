import type { ReactElement } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import type { User } from '../data/users';

interface ProfileState {
  user: User;
}

export function UserProfilePage(): ReactElement {
  // TODO: read state from useLocation()
  // TODO: cast location.state to ProfileState (or check it properly)
  // TODO: if state is null/undefined, show "Select a user" fallback with link to /users

  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ProfileState | null;

  if (!state?.user) {
    return (
      <section>
        <h1 className="text-4xl font-black tracking-tight text-white">No user selected</h1>
        <p className="mt-4 text-base text-slate-300">
          Navigate here from the users list to see a profile.
        </p>
        <Link
          to="/users"
          className="mt-6 inline-block rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Go to Users
        </Link>
      </section>
    );
  }

  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Profile</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight text-white">{state.user.name}</h1>
      <p className="mt-2 text-base text-slate-300">{state.user.role}</p>
      <p className="mt-1 text-sm text-slate-400">ID: {state.user.id}</p>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
      >
        ← Back
      </button>
    </section>
  );
}
