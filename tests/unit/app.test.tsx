import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { act, fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';
import { useCartStore } from '../../src/store/cart-store';

// Reset store between tests
beforeEach(() => {
  act(() => {
    useCartStore.setState({ items: [] });
  });
});

describe('Topic 24.1 — cart store actions', () => {
  it('adds a new item with quantity 1', () => {
    act(() => {
      useCartStore.getState().addItem({ id: 'a', name: 'Book', price: 10 });
    });

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual({ id: 'a', name: 'Book', price: 10, quantity: 1 });
  });

  it('increments quantity when adding an existing item', () => {
    act(() => {
      useCartStore.getState().addItem({ id: 'a', name: 'Book', price: 10 });
      useCartStore.getState().addItem({ id: 'a', name: 'Book', price: 10 });
    });

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0]!.quantity).toBe(2);
  });

  it('removes an item by id', () => {
    act(() => {
      useCartStore.getState().addItem({ id: 'a', name: 'Book', price: 10 });
      useCartStore.getState().addItem({ id: 'b', name: 'Pen', price: 5 });
      useCartStore.getState().removeItem('a');
    });

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0]!.id).toBe('b');
  });

  it('updates quantity for an item', () => {
    act(() => {
      useCartStore.getState().addItem({ id: 'a', name: 'Book', price: 10 });
      useCartStore.getState().updateQuantity('a', 5);
    });

    expect(useCartStore.getState().items[0]!.quantity).toBe(5);
  });

  it('removes item when quantity is set to 0', () => {
    act(() => {
      useCartStore.getState().addItem({ id: 'a', name: 'Book', price: 10 });
      useCartStore.getState().updateQuantity('a', 0);
    });

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('clears the entire cart', () => {
    act(() => {
      useCartStore.getState().addItem({ id: 'a', name: 'Book', price: 10 });
      useCartStore.getState().addItem({ id: 'b', name: 'Pen', price: 5 });
      useCartStore.getState().clearCart();
    });

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('computes totalItems as sum of quantities', () => {
    act(() => {
      useCartStore.getState().addItem({ id: 'a', name: 'Book', price: 10 });
      useCartStore.getState().addItem({ id: 'b', name: 'Pen', price: 5 });
      useCartStore.getState().updateQuantity('a', 3);
    });

    expect(useCartStore.getState().totalItems()).toBe(4);
  });

  it('computes totalPrice as sum of price × quantity', () => {
    act(() => {
      useCartStore.getState().addItem({ id: 'a', name: 'Book', price: 10 });
      useCartStore.getState().addItem({ id: 'b', name: 'Pen', price: 5 });
      useCartStore.getState().updateQuantity('a', 2);
    });

    expect(useCartStore.getState().totalPrice()).toBe(25);
  });
});

describe('Topic 24.1 — UI integration', () => {
  it('renders products and adds items to cart', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Zustand cart' })).toBeInTheDocument();
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: 'Add to cart' })[0]!);

    expect(screen.queryByText('Your cart is empty')).not.toBeInTheDocument();
    expect(screen.getByText(/React Handbook/)).toBeInTheDocument();
    expect(screen.getByText('Items: 1')).toBeInTheDocument();
  });
});

describe('Topic 24.1 — source checks', () => {
  const storeSource = readFileSync(resolve(process.cwd(), 'src/store/cart-store.ts'), 'utf8');

  it('uses devtools middleware', () => {
    expect(storeSource).toMatch(/devtools/);
  });

  it('uses persist middleware', () => {
    expect(storeSource).toMatch(/persist/);
    expect(storeSource).toMatch(/cart-storage/);
  });

  it('imports middleware from zustand', () => {
    expect(storeSource).toMatch(/from\s+['"]zustand\/middleware['"]/);
  });
});
