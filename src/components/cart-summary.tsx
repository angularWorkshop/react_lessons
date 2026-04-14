import type { ReactElement } from 'react';

import { useCartStore } from '../store/cart-store';

// TODO: use a selector to subscribe only to `items` — not the whole store
// Example: useCartStore((state) => state.items)

export function CartSummary(): ReactElement {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <section className="cart-summary">
      <h2>Cart</h2>
      <p className="cart-summary__count">Items: {totalItems()}</p>
      <p className="cart-summary__total">Total: ${totalPrice().toFixed(2)}</p>

      {items.length === 0 ? (
        <p className="cart-summary__empty">Your cart is empty</p>
      ) : (
        <ul className="cart-summary__list">
          {items.map((item) => (
            <li key={item.id} className="cart-summary__item">
              {item.name} × {item.quantity} — ${(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
      )}

      <button type="button" className="cart-summary__clear" onClick={clearCart} disabled={items.length === 0}>
        Clear cart
      </button>
    </section>
  );
}
