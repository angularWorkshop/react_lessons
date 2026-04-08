import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';
import { CATALOG, INITIAL_CART, cartReducer } from '../../src/cartReducer';

describe('Topic 12.1 runtime', () => {
  it('renders the cart reducer shell and initial total', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Cart reducer' })).toBeInTheDocument();
    expect(screen.getByText('$240.00')).toBeInTheDocument();
  });

  it('adds products through reducer actions and updates totals', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /React Mug\$18\.00/ }));
    expect(screen.getByLabelText('React Mug quantity')).toHaveTextContent('1');
    expect(screen.getByText('$258.00')).toBeInTheDocument();
  });

  it('updates quantity and clears the cart', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Increase Mechanical Keyboard' }));
    expect(screen.getByLabelText('Mechanical Keyboard quantity')).toHaveTextContent('2');
    expect(screen.getByText('$360.00')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear cart' }));
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });
});

describe('Topic 12.1 reducer', () => {
  it('is pure and returns a new array for ADD_ITEM', () => {
    const nextState = cartReducer(INITIAL_CART, { type: 'ADD_ITEM', product: CATALOG[0] });

    expect(nextState).not.toBe(INITIAL_CART);
    expect(INITIAL_CART).toHaveLength(2);
    expect(nextState.at(-1)?.id).toBe('mug');
  });

  it('clears the cart through the CLEAR action', () => {
    expect(cartReducer(INITIAL_CART, { type: 'CLEAR' })).toEqual([]);
  });
});

describe('Topic 12.1 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');
  const reducerSource = readFileSync(resolve(process.cwd(), 'src/cartReducer.ts'), 'utf8');

  it('uses useReducer instead of useState for the cart state', () => {
    expect(appSource).toMatch(/const \[cart, dispatch\] = useReducer\(cartReducer, INITIAL_CART\)/);
  });

  it('models cart actions as a discriminated union and handles them with a switch', () => {
    expect(reducerSource).toMatch(/type CartAction =/);
    expect(reducerSource).toMatch(/\| \{ type: 'ADD_ITEM'; product: CatalogProduct \}/);
    expect(reducerSource).toMatch(/\| \{ type: 'REMOVE_ITEM'; itemId: string \}/);
    expect(reducerSource).toMatch(
      /\| \{ type: 'UPDATE_QUANTITY'; itemId: string; quantity: number \}/,
    );
    expect(reducerSource).toMatch(/\| \{ type: 'CLEAR' \}/);
    expect(reducerSource).toMatch(/switch \(action\.type\)/);
  });
});
