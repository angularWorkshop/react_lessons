import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen, within } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 5.1 runtime', () => {
  it('renders both collections through the list preview', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Generic list component' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Users list')).toBeInTheDocument();
    expect(screen.getByLabelText('Products list')).toBeInTheDocument();
  });

  it('shows entries for users and products', () => {
    render(<App />);

    expect(within(screen.getByLabelText('Users list')).getByText(/Ada Lovelace/)).toBeInTheDocument();
    expect(within(screen.getByLabelText('Products list')).getByText(/Design Tokens Guide/)).toBeInTheDocument();
  });
});

describe('Topic 5.1 source checks', () => {
  const listSource = readFileSync(resolve(process.cwd(), 'src/components/List.tsx'), 'utf8');

  it('declares the list as a generic component', () => {
    expect(listSource).toMatch(/function List<\s*T\s*>/);
  });

  it('types items, renderItem, and keyExtractor through the same generic T', () => {
    expect(listSource).toMatch(/items:\s*T\[\]/);
    expect(listSource).toMatch(/renderItem:\s*\(item:\s*T\)\s*=>\s*ReactNode/);
    expect(listSource).toMatch(/keyExtractor\?:\s*\(item:\s*T\)\s*=>\s*string/);
  });
});
