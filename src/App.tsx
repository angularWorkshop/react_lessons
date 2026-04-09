import { useRef, useState, type ReactElement } from 'react';

type SortOrder = 'title' | 'price';

interface CatalogItem {
  id: string;
  title: string;
  category: 'hooks' | 'typescript' | 'performance' | 'testing';
  price: number;
}

const PRODUCTS: CatalogItem[] = Array.from({ length: 10_000 }, (_, index) => ({
  id: `item-${index + 1}`,
  title: `Lesson Asset ${String(index + 1).padStart(4, '0')}`,
  category: ['hooks', 'typescript', 'performance', 'testing'][index % 4] as CatalogItem['category'],
  price: 15 + (index % 7) * 5,
}));

function getVisibleProducts(
  products: CatalogItem[],
  query: string,
  sortOrder: SortOrder,
): CatalogItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  const filteredItems = products.filter((product) =>
    normalizedQuery.length === 0
      ? true
      : product.title.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery),
  );

  return [...filteredItems].sort((left, right) => {
    if (sortOrder === 'price') {
      return left.price - right.price;
    }

    return left.title.localeCompare(right.title);
  });
}

export function App(): ReactElement {
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('title');
  const [themeCount, setThemeCount] = useState(0);
  const computationRunsRef = useRef(0);

  computationRunsRef.current += 1;
  const visibleProducts = getVisibleProducts(PRODUCTS, query, sortOrder);

  return (
    <main className="app-shell">
      <section className="memo-shell">
        <p className="eyebrow">Topic 13.1</p>
        <h1>Expensive filtering</h1>
        <p className="description">
          Filter and sort a large catalog without recomputing on unrelated renders.
        </p>

        <div className="toolbar">
          <label className="field">
            <span>Search catalog</span>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="hooks, testing, 0042..."
            />
          </label>

          <button
            type="button"
            onClick={() => setSortOrder((currentOrder) => (currentOrder === 'title' ? 'price' : 'title'))}
          >
            Sort: {sortOrder}
          </button>

          <button type="button" onClick={() => setThemeCount((count) => count + 1)}>
            Toggle unrelated theme {themeCount}
          </button>
        </div>

        <div className="stats-row">
          <span>Visible items: {visibleProducts.length}</span>
          <span>Computed results: {computationRunsRef.current}</span>
        </div>

        <ul className="item-list">
          {visibleProducts.slice(0, 6).map((product) => (
            <li key={product.id}>
              <strong>{product.title}</strong>
              <span>{product.category}</span>
              <span>${product.price}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
