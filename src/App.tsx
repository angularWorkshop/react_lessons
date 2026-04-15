import type { ReactElement } from 'react';

const highlights = [
  {
    title: 'Brand colors',
    copy: 'Map one accent system once and reuse it across cards, buttons, and headings.',
  },
  {
    title: 'Custom radius',
    copy: 'Give the UI a recognizable silhouette instead of repeating generic rounded-2xl everywhere.',
  },
];

export function App(): ReactElement {
  return (
    <main className="min-h-screen bg-ink-950 px-4 py-12 font-body text-slate-50 sm:px-6">
      <section className="mx-auto w-full max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-300">Topic 31.2</p>
        <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
          Custom Tailwind Theme
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          Extend the Tailwind theme so the page speaks in product tokens instead of one-off utility choices.
        </p>

        <section
          data-testid="brand-hero"
          className="mt-10 rounded-panel border border-brand-400/20 bg-ink-900/90 p-8 shadow-panel"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-300">Studio launch</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Build a brand theme that feels intentional.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Move common UI choices into the Tailwind theme and consume them through reusable brand utilities.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-brand-500">
              Launch preview
            </button>
            <button className="rounded-full border border-brand-300/20 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-brand-300/40 hover:bg-brand-400/10">
              View tokens
            </button>
          </div>
        </section>

        <div data-testid="theme-grid" className="mt-8 grid grid-cols-1 gap-5 xs:grid-cols-2">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-panel border border-white/10 bg-white/5 p-6 shadow-panel"
            >
              <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
