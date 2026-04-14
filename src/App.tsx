import { useRef, type ReactElement } from 'react';

import { useClickOutside } from './hooks/useClickOutside';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useMediaQuery } from './hooks/useMediaQuery';

export function App(): ReactElement {
  const panelRef = useRef<HTMLDivElement>(null);
  const [savedView, setSavedView] = useLocalStorage<'grid' | 'list'>('dashboard-view', 'grid');
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  useClickOutside(panelRef, () => {
    setSavedView('grid');
  });

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Topic 22.1</p>
        <h1>Hooks library workspace</h1>
        <p>
          Build reusable hooks that manage localStorage, media queries, and outside-click interactions without leaking
          component-specific logic.
        </p>
      </section>

      <section ref={panelRef} className="card">
        <h2>Preview</h2>
        <p>Saved view: {savedView}</p>
        <p>Prefers dark scheme: {prefersDark ? 'yes' : 'no'}</p>
        <button type="button" onClick={() => setSavedView(savedView === 'grid' ? 'list' : 'grid')}>
          Toggle saved view
        </button>
      </section>
    </main>
  );
}
