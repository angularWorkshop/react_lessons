import type { ReactElement } from 'react';

import { CartSummary } from './components/cart-summary';
import { ProductList } from './components/product-list';

export function App(): ReactElement {
  return (
    <main className="app-shell">
      <section className="workspace">
        <p className="workspace__eyebrow">Topic 24.1</p>
        <h1>Zustand cart</h1>
        <p className="workspace__description">
          Build a shopping cart with Zustand: actions, persist, devtools, and selectors.
        </p>

        <div className="store-layout">
          <ProductList />
          <CartSummary />
        </div>
      </section>
    </main>
  );
}
