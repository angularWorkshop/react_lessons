import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 6.1 runtime', () => {
  it('renders the cart title and initial total', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Shopping cart' })).toBeInTheDocument();
    expect(screen.getByText('$240.00')).toBeInTheDocument();
  });

  it('adds a catalog product and updates the total', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /React Mug\$18\.00/ }));

    expect(screen.getByLabelText('React Mug quantity')).toHaveTextContent('1');
    expect(screen.getByText('$258.00')).toBeInTheDocument();
  });

  it('changes quantity and clears the cart', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Increase Mechanical Keyboard' }));
    expect(screen.getByLabelText('Mechanical Keyboard quantity')).toHaveTextContent('2');
    expect(screen.getByText('$360.00')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear cart' }));
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });
});

describe('Topic 6.1 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('types the cart state explicitly', () => {
    expect(appSource).toMatch(/useState<CartItem\[]>\(INITIAL_CART\)/);
  });

  it('uses functional state updates for cart mutations', () => {
    expect(appSource).toMatch(/setCart\(\(currentCart\)\s*=>/);
  });

  it('derives total with reduce instead of storing duplicate state', () => {
    expect(appSource).toMatch(/const total = cart\.reduce\(/);
  });
});
