import type { ReactElement } from 'react';

export function AboutPage(): ReactElement {
  return (
    <section>
      <h1 className="text-4xl font-black tracking-tight text-white">About</h1>
      <p className="mt-4 text-base leading-7 text-slate-300">
        This app demonstrates React Router v6 basics: routes, links, params, and navigation.
      </p>
    </section>
  );
}
