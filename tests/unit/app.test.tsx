import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 19.2 runtime', () => {
  it('renders the deferred search workspace', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Deferred search workspace' })).toBeInTheDocument();
    expect(screen.getByLabelText('Search 50k customers')).toBeInTheDocument();
  });

  it('filters the visible list after typing into the search field', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Search 50k customers'), {
      target: { value: '420' },
    });

    expect(screen.getByText('Visible results for "420"')).toBeInTheDocument();
    expect(screen.getByText('Customer 00420')).toBeInTheDocument();
  });
});

describe('Topic 19.2 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('derives a deferred query with useDeferredValue', () => {
    expect(appSource).toMatch(/const deferredQuery = useDeferredValue\(query\)/);
    expect(appSource).toMatch(/const visibleCustomers = useMemo\(\(\) => filterCustomers\(deferredQuery\), \[deferredQuery\]\)/);
  });

  it('marks stale UI while deferred results are catching up', () => {
    expect(appSource).toMatch(/const isStale = query !== deferredQuery/);
    expect(appSource).toMatch(/style=\{\{ opacity: isStale \? 0\.45 : 1 \}\}/);
  });
});
