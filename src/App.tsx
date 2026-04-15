import type { ReactElement } from 'react';

import { Button } from './components/button';

export function App(): ReactElement {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-50 sm:px-6">
      <section className="mx-auto w-full max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Topic 32.1</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
          Button with CVA
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          Move variant logic out of manual string concatenation and into a typed component contract.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button className="bg-white text-slate-950">Custom class</Button>
        </div>
      </section>
    </main>
  );
}
