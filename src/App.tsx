import { useState, type ReactElement } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CatalogProduct {
  id: string;
  name: string;
  price: number;
}

const INITIAL_CART: CartItem[] = [
  { id: 'keyboard', name: 'Mechanical Keyboard', price: 120, quantity: 1 },
  { id: 'mouse', name: 'Wireless Mouse', price: 60, quantity: 2 },
];

const CATALOG: CatalogProduct[] = [
  { id: 'mug', name: 'React Mug', price: 18 },
  { id: 'stickers', name: 'Sticker Pack', price: 12 },
];

function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function App(): ReactElement {
  // TODO: make the state generic: useState<CartItem[]>(...)
  const [cart, setCart] = useState(INITIAL_CART);

  const addProduct = (product: CatalogProduct): void => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
      return;
    }

    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const removeItem = (itemId: string): void => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const changeQuantity = (itemId: string, nextQuantity: number): void => {
    if (nextQuantity < 1) {
      removeItem(itemId);
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === itemId ? { ...item, quantity: nextQuantity } : item,
      ),
    );
  };

  const clearCart = (): void => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="app-shell">
      <div className="hero-card cart-shell">
        <p className="eyebrow">Topic 6.1</p>
        <h1>Shopping cart</h1>
        <p className="description">
          Manage a typed cart with immutable state updates and a derived total.
        </p>

        <section className="cart-section" aria-label="Catalog">
          <div className="section-header">
            <h2>Catalog</h2>
            <span>Add a product to the cart</span>
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
              cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <div>
                    <strong>{item.name}</strong>
                    <p>{formatCurrency(item.price)} each</p>
                  </div>

                  <div className="cart-controls">
                    <button
                      type="button"
                      aria-label={`Decrease ${item.name}`}
                      onClick={() => changeQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span aria-label={`${item.name} quantity`}>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${item.name}`}
                      onClick={() => changeQuantity(item.id, item.quantity + 1)}
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
