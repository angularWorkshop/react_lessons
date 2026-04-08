import { useReducer, type ReactElement } from 'react';

import {
  CATALOG,
  INITIAL_CART,
  cartReducer,
  formatCurrency,
  type CatalogProduct,
  type CartItem,
} from './cartReducer';

export function App(): ReactElement {
  const [cart, dispatch] = useReducer(cartReducer, INITIAL_CART);

  const addProduct = (product: CatalogProduct): void => {
    dispatch({ type: 'ADD_ITEM', product });
  };

  const removeItem = (itemId: string): void => {
    dispatch({ type: 'REMOVE_ITEM', itemId });
  };

  const updateQuantity = (itemId: string, quantity: number): void => {
    dispatch({ type: 'UPDATE_QUANTITY', itemId, quantity });
  };

  const clearCart = (): void => {
    dispatch({ type: 'CLEAR' });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="app-shell">
      <div className="hero-card cart-shell">
        <p className="eyebrow">Topic 12.1</p>
        <h1>Cart reducer</h1>
        <p className="description">
          Move cart transitions into a pure reducer and drive the UI through typed actions.
        </p>

        <section className="cart-section" aria-label="Catalog">
          <div className="section-header">
            <h2>Catalog</h2>
            <span>Dispatch ADD_ITEM from the product list</span>
          </div>

          <div className="catalog-grid">
            {CATALOG.map((product) => (
              <button
                key={product.id}
                className="catalog-card"
                type="button"
                onClick={() => addProduct(product)}
              >
                <strong>{product.name}</strong>
                <span>{formatCurrency(product.price)}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="cart-section" aria-label="Cart items">
          <div className="section-header">
            <h2>Cart</h2>
            <button className="text-action" type="button" onClick={clearCart}>
              Clear cart
            </button>
          </div>

          <ul className="cart-list">
            {cart.length === 0 ? (
              <li className="empty-state">Your cart is empty.</li>
            ) : (
              cart.map((item: CartItem) => (
                <li key={item.id} className="cart-item">
                  <div>
                    <strong>{item.name}</strong>
                    <p>{formatCurrency(item.price)} each</p>
                  </div>

                  <div className="cart-controls">
                    <button
                      type="button"
                      aria-label={`Decrease ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span aria-label={`${item.name} quantity`}>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>

          <div className="cart-total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </section>
      </div>
    </main>
  );
}
