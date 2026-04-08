import type { ReactElement } from 'react';

import { List } from './components/List';

const USERS = [
  { id: 'u-1', name: 'Ada Lovelace', role: 'Platform engineer' },
  { id: 'u-2', name: 'Grace Hopper', role: 'Compiler engineer' },
];

const PRODUCTS = [
  { sku: 'p-1', title: 'Design Tokens Guide', price: '$39' },
  { sku: 'p-2', title: 'React Performance Audit', price: '$79' },
];

export function App(): ReactElement {
  return (
    <main className="app-shell">
      <div className="hero-card list-shell">
        <p className="eyebrow">Topic 5.1</p>
        <h1>Generic list component</h1>
        <p className="description">
          Render multiple collections through the same reusable list contract.
        </p>

        <div className="list-grid">
          <section className="list-panel" aria-label="Users list">
            <h2>Team</h2>
            <List
              items={USERS}
              keyExtractor={(user) => user.id}
              renderItem={(user) => (
                <span>
                  {user.name} — {user.role}
                </span>
              )}
            />
          </section>

          <section className="list-panel" aria-label="Products list">
            <h2>Products</h2>
            <List
              items={PRODUCTS}
              keyExtractor={(product) => product.sku}
              renderItem={(product) => (
                <span>
                  {product.title} — {product.price}
                </span>
              )}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
