import type { ReactElement } from 'react';

export function DashboardIndexPage(): ReactElement {
  return (
    <section>
      <h1 className="text-4xl font-black tracking-tight text-white">Dashboard</h1>
      <p className="mt-4 text-base leading-7 text-slate-300">
        Welcome to the dashboard. Select a section from the sidebar.
      </p>
    </section>
  );
}
