import type { ReactElement } from 'react';

export function DashboardStatsPage(): ReactElement {
  return (
    <section>
      <h1 className="text-4xl font-black tracking-tight text-white">Stats</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-400">Total Users</p>
          <p className="mt-1 text-3xl font-bold text-white">1,284</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-400">Active Today</p>
          <p className="mt-1 text-3xl font-bold text-white">342</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-400">Revenue</p>
          <p className="mt-1 text-3xl font-bold text-white">$12.4k</p>
        </div>
      </div>
    </section>
  );
}
