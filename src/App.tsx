import type { ReactElement } from 'react';

import { useLocalStorage } from './hooks/use-local-storage';

export function App(): ReactElement {
  const [name, setName, removeName] = useLocalStorage('user-name', '');

  return (
    <main className="app-shell">
      <section className="workspace">
        <p className="workspace__eyebrow">Topic 26.1</p>
        <h1>Hook testing workspace</h1>
        <p className="workspace__description">
          Custom hooks to practice renderHook, act, and IntersectionObserver mocking.
        </p>

        <div className="demo-block">
          <h2>useLocalStorage demo</h2>
          <label htmlFor="name-input">Name</label>
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Stored: {name || '(empty)'}</p>
          <button type="button" onClick={removeName}>Clear</button>
        </div>
      </section>
    </main>
  );
}
