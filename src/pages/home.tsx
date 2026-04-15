import type { ReactElement } from 'react';

export function HomePage(): ReactElement {
  return (
    <section>
      <h1 className="text-4xl font-black tracking-tight text-white">Home</h1>
      <p className="mt-4 text-base leading-7 text-slate-300">
        Welcome to the RouterApp demo. Use the navigation above to explore pages.
      </p>
    </section>
  );
}
