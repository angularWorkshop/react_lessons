import { useMemo, useState, type ChangeEvent, type ReactElement } from 'react';

const CUSTOMERS = Array.from({ length: 50000 }, (_, index) => {
  const id = index + 1;
  return `Customer ${id.toString().padStart(5, '0')}`;
});

function filterCustomers(query: string): string[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return CUSTOMERS.slice(0, 12);
  }

  return CUSTOMERS.filter((customer) => customer.toLowerCase().includes(normalizedQuery)).slice(0, 12);
}

export function App(): ReactElement {
  const [query, setQuery] = useState('');

  const visibleCustomers = useMemo(() => filterCustomers(query), [query]);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.target.value);
  }

  return (
    <main className="app-shell">
      <section className="deferred-panel">
        <p className="deferred-panel__eyebrow">Topic 19.2</p>
        <h1>Deferred search workspace</h1>
        <p className="deferred-panel__description">
          Delay the heavy list update while keeping the input value urgent.
        </p>

        <label className="deferred-input">
          <span>Search 50k customers</span>
          <input
            type="search"
            placeholder="Type customer id"
            value={query}
            onChange={handleChange}
          />
        </label>

        <div className="deferred-meta">
          <p>{query ? `Visible results for "${query}"` : 'Visible results for "all"'}</p>
          <strong>{visibleCustomers.length} visible cards</strong>
        </div>

        <ul className="deferred-grid" aria-label="Deferred search results">
          {visibleCustomers.map((customer) => (
            <li key={customer} className="deferred-card">
              <span className="deferred-card__badge">CRM</span>
              <strong>{customer}</strong>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
