import type { ReactElement } from 'react';

export function LoginPage(): ReactElement {
  return (
    <section className="text-center">
      <h1 className="text-4xl font-black tracking-tight text-white">Login</h1>
      <p className="mt-4 text-base text-slate-300">
        Sign in to access the dashboard.
      </p>
      <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-cyan-300"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-cyan-300"
        />
        <button className="w-full rounded-full bg-cyan-400 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
          Sign in
        </button>
      </form>
    </section>
  );
}
