import { useEffect, useState, type ReactElement } from 'react';

import { Button } from './components/button';
import { Skeleton } from './components/skeleton';
import { ThemeToggle } from './components/theme-toggle';
import { UserCard } from './components/user-card';

interface User {
  name: string;
  role: string;
}

const MOCK_USERS: User[] = [
  { name: 'Alice Chen', role: 'Frontend Engineer' },
  { name: 'Bob Markov', role: 'Product Designer' },
  { name: 'Clara Ruiz', role: 'Tech Lead' },
];

export function App(): ReactElement {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(MOCK_USERS);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleReload = () => {
    setLoading(true);
    setUsers([]);
    setTimeout(() => {
      setUsers(MOCK_USERS);
      setLoading(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 transition-colors sm:px-6 dark:bg-slate-950 dark:text-slate-50">
      <section className="mx-auto w-full max-w-5xl">
        <header className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-300">
              Topic 33.2
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Skeleton &amp; Animations
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Loading placeholders that match content shapes, with staggered reveal animations.
            </p>
          </div>
          <ThemeToggle />
        </header>

        <div className="mt-8 flex gap-4">
          <Button onClick={handleReload}>Reload</Button>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Team</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {loading
              ? Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="space-y-3 rounded-[28px] border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
                    <Skeleton shape="avatar" />
                    <Skeleton shape="title" />
                    <Skeleton shape="text" />
                    <Skeleton shape="text" className="w-2/3" />
                  </div>
                ))
              : users.map((user, i) => (
                  <UserCard
                    key={user.name}
                    name={user.name}
                    role={user.role}
                    animated
                    index={i}
                  />
                ))}
          </div>
        </section>
      </section>
    </main>
  );
}
