import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { act, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 28.1 — Suspense dashboard', () => {
  it('shows skeletons initially then resolves both sections through Suspense', async () => {
    await act(async () => {
      render(<App />);
    });

    // Heading is visible
    expect(screen.getByRole('heading', { name: 'Suspense dashboard' })).toBeInTheDocument();

    // Wait for data to resolve through Suspense
    expect(await screen.findByText('Alice Martin')).toBeInTheDocument();
    expect(screen.getByText('Bob Chen')).toBeInTheDocument();
    expect(screen.getByText('Total users')).toBeInTheDocument();
    expect(screen.getByText('128')).toBeInTheDocument();
    expect(screen.getByText('43')).toBeInTheDocument();
  });
});

describe('Topic 28.1 — source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('uses Suspense boundaries', () => {
    expect(appSource).toMatch(/<Suspense/);
  });

  it('uses Skeleton as fallback', () => {
    expect(appSource).toMatch(/fallback=\{<Skeleton/);
  });

  it('uses ErrorBoundary', () => {
    expect(appSource).toMatch(/<ErrorBoundary/);
  });

  it('has separate Suspense for each section', () => {
    const suspenseCount = (appSource.match(/<Suspense/g) ?? []).length;
    expect(suspenseCount).toBeGreaterThanOrEqual(2);
  });

  it('does not use manual loading state', () => {
    expect(appSource).not.toMatch(/useState.*loading/);
    expect(appSource).not.toMatch(/isLoading/);
  });
});
