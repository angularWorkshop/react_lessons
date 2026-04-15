import type { ReactElement } from 'react';

type UserCard = {
  name: string;
  role: string;
  initials: string;
  tags: string[];
};

const users: UserCard[] = [
  {
    name: 'Ava Patel',
    role: 'Design Systems Engineer',
    initials: 'AP',
    tags: ['Tokens', 'Docs', 'A11y'],
  },
  {
    name: 'Jordan Kim',
    role: 'Frontend Platform Lead',
    initials: 'JK',
    tags: ['DX', 'Vite', 'Testing'],
  },
  {
    name: 'Mia Chen',
    role: 'Product UI Developer',
    initials: 'MC',
    tags: ['Motion', 'Layout', 'Cards'],
  },
];

export function App(): ReactElement {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-50 sm:px-6">
      <section className="mx-auto w-full max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Topic 31.1</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
          First Tailwind Page
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          Install Tailwind in a Vite project and build a profile grid without writing page-level CSS rules.
        </p>

        <div data-testid="profiles-grid" className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {users.map((user) => (
            <article
              key={user.name}
              className="group rounded-[28px] border border-white/10 bg-white/5 p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-300/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-xl font-bold text-cyan-200 transition-colors duration-300 group-hover:bg-cyan-300/20 group-hover:text-cyan-50">
                  {user.initials}
                </div>
                <span className="rounded-full border border-cyan-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 transition-colors duration-300 group-hover:border-cyan-200/40 group-hover:text-cyan-50">
                  Active
                </span>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-100">
                {user.name}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{user.role}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {user.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 transition-colors duration-300 group-hover:border-cyan-200/20 group-hover:bg-cyan-400/10 group-hover:text-cyan-50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
