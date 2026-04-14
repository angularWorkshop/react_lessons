import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 28.1 — Suspense dashboard', () => {
  it('renders the heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Suspense dashboard' })).toBeInTheDocument();
  });

  it('shows skeleton fallbacks while data loads', () => {
    render(<App />);
    const skeletons = screen.getAllByRole('status');
    expect(skeletons.length).toBeGreaterThanOrEqual(2);
  });

  it('renders stats after suspense resolves', async () => {
    render(<App />);
    expect(await screen.findByText('128')).toBeInTheDocument();
    expect(await screen.findByText('Total users')).toBeInTheDocument();
  });

  it('renders user list after suspense resolves', async () => {
    render(<App />);
    expect(await screen.findByText('Alice Martin')).toBeInTheDocument();
    expect(await screen.findByText('Engineer')).toBeInTheDocument();
  });

  it('renders both sections independently', async () => {
    render(<App />);
    // Stats resolve at 800ms, users at 1200ms — stats should appear first
    expect(await screen.findByText('43')).toBeInTheDocument();
    expect(await screen.findByText('Bob Chen')).toBeInTheDocument();
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
