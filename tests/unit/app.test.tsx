import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 13.1 runtime', () => {
  it('renders the expensive filtering shell', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Expensive filtering' })).toBeInTheDocument();
    expect(screen.getByText('Visible items: 10000')).toBeInTheDocument();
  });

  it('filters the catalog and updates the visible item count', () => {
    render(<App />);

    fireEvent.change(screen.getByRole('textbox', { name: 'Search catalog' }), {
      target: { value: 'testing' },
    });

    expect(screen.getByText('Visible items: 2500')).toBeInTheDocument();
  });

  it('does not recompute the expensive list for unrelated renders', () => {
    render(<App />);

    expect(screen.getByText('Computed results: 1')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Toggle unrelated theme 0' }));

    expect(screen.getByText('Computed results: 1')).toBeInTheDocument();
  });
});

describe('Topic 13.1 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('memoizes the filtered catalog with useMemo', () => {
    expect(appSource).toMatch(/import \{ useMemo, useRef, useState, type ReactElement \} from 'react';/);
    expect(appSource).toMatch(/const visibleProducts = useMemo\(\(\) => \{/);
  });

  it('tracks the correct dependencies for the expensive computation', () => {
    expect(appSource).toMatch(/\}, \[query, sortOrder\]\);/);
  });
});
