import { useMemo, useState, useTransition, type ChangeEvent, type ReactElement } from 'react';

const PRODUCTS = Array.from({ length: 50000 }, (_, index) => {
  const id = index + 1;
  return `Product ${id.toString().padStart(5, '0')}`;
});

function filterProducts(searchQuery: string): string[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  if (!normalizedQuery) {
    return PRODUCTS.slice(0, 12);
  }

  return PRODUCTS.filter((product) => product.toLowerCase().includes(normalizedQuery)).slice(0, 12);
}

export function App(): ReactElement {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const visibleProducts = useMemo(() => filterProducts(searchQuery), [searchQuery]);
  const resultsLabel = searchQuery ? `Results for "${searchQuery}"` : 'Trending inventory';

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const nextValue = event.target.value;

    setInputValue(nextValue);
    startTransition(() => {
      setSearchQuery(nextValue);
    });
  }

  return (
    <main className="app-shell">
      <section className="search-panel">
        <p className="search-panel__eyebrow">Topic 19.1</p>
        <h1>Transition search workspace</h1>
        <p className="search-panel__description">
          Keep the input responsive while filtering a very large catalog.
        </p>

        <label className="search-input">
          <span>Search 50k products</span>
          <input
            type="search"
            placeholder="Type product id"
            value={inputValue}
            onChange={handleChange}
          />
        </label>

        <div className="results-summary">
          <p>{isPending ? 'Updating results...' : resultsLabel}</p>
          <strong>{visibleProducts.length} visible cards</strong>
        </div>

        <ul className="results-grid" aria-label="Search results">
          {visibleProducts.map((product) => (
            <li key={product} className="result-card">
              <span className="result-card__badge">Catalog</span>
              <strong>{product}</strong>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
