import { useRef, useState, type ReactElement } from 'react';

import { SearchInput } from './components/SearchInput';

export function App(): ReactElement {
  const [query, setQuery] = useState('react hooks');
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <main className="app-shell">
      <div className="hero-card ref-shell">
        <p className="eyebrow">Topic 8.1</p>
        <h1>Autofocus search input</h1>
        <p className="description">
          Forward a typed ref to the native input so the parent can manage focus.
        </p>

        <div className="search-panel">
          <SearchInput
            label="Search lessons"
            placeholder="Type a topic"
            value={query}
            onChange={setQuery}
            inputRef={inputRef}
          />

          <button
            type="button"
            className="focus-button"
            onClick={() => inputRef.current?.focus()}
          >
            Focus input
          </button>
        </div>
      </div>
    </main>
  );
}
