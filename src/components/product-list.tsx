import type { ReactElement } from 'react';

import { useCartStore } from '../store/cart-store';

interface Product {
  id: string;
  name: string;
  price: number;
}

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'React Handbook', price: 29.99 },
  { id: 'p2', name: 'TypeScript Guide', price: 24.99 },
  { id: 'p3', name: 'Zustand Deep Dive', price: 19.99 },
  { id: 'p4', name: 'Vite Starter Kit', price: 14.99 },
];

export function ProductList(): ReactElement {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <section className="product-list">
      <h2>Products</h2>
      <ul className="product-list__items">
        {PRODUCTS.map((product) => (
          <li key={product.id} className="product-list__item">
            <span className="product-list__name">{product.name}</span>
            <span className="product-list__price">${product.price.toFixed(2)}</span>
            <button type="button" onClick={() => addItem(product)}>
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
