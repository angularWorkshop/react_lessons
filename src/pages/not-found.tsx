import type { ReactElement } from 'react';

import { Link } from 'react-router-dom';

export function NotFoundPage(): ReactElement {
  return (
    <section className="text-center">
      <h1 className="text-6xl font-black text-white">404</h1>
      <p className="mt-4 text-base text-slate-300">Page not found</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
      >
        Go home
      </Link>
    </section>
  );
}
