import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 19.1 runtime', () => {
  it('renders the transition search workspace', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Transition search workspace' })).toBeInTheDocument();
    expect(screen.getByLabelText('Search 50k products')).toBeInTheDocument();
    expect(screen.getByText('Trending inventory')).toBeInTheDocument();
  });

  it('filters the catalog after typing into the search field', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Search 50k products'), {
      target: { value: '4999' },
    });

    expect(screen.getByText('Results for "4999"')).toBeInTheDocument();
    expect(screen.getByText('Product 04999')).toBeInTheDocument();
  });
});

describe('Topic 19.1 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('uses useTransition to mark the list update as low priority', () => {
    expect(appSource).toMatch(/const \[isPending, startTransition\] = useTransition\(\)/);
    expect(appSource).toMatch(/startTransition\(\(\) => \{/);
    expect(appSource).toMatch(/setSearchQuery\(nextValue\)/);
  });

  it('renders a pending indicator while transition work is happening', () => {
    expect(appSource).toMatch(/isPending \? 'Updating results\.\.\.' : resultsLabel/);
  });
});
