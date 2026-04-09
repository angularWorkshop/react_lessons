import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { App } from '../../src/App';

describe('Topic 18.1 runtime', () => {
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

  beforeEach(() => {
    consoleErrorSpy.mockClear();
  });

  it('renders the route shell before any crash', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Error boundary workspace' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Broken route' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Team health' })).toBeInTheDocument();
  });

  it('shows fallback UI when the broken route throws and recovers after retry', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Broken route' }));

    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(screen.getByRole('heading', { name: 'Recovery complete' })).toBeInTheDocument();
  });

  it('logs the captured error through componentDidCatch', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Broken route' }));

    expect(
      consoleErrorSpy.mock.calls.some(
        ([firstArg]) => typeof firstArg === 'string' && firstArg.includes('[ErrorBoundary] captured'),
      ),
    ).toBe(true);
  });
});

describe('Topic 18.1 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('uses a class-based error boundary with getDerivedStateFromError', () => {
    expect(appSource).toMatch(/class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState>/);
    expect(appSource).toMatch(/public static getDerivedStateFromError\(\): ErrorBoundaryState/);
  });

  it('implements componentDidCatch and a retry handler', () => {
    expect(appSource).toMatch(/public componentDidCatch\(error: Error, info: ErrorInfo\): void/);
    expect(appSource).toMatch(/private handleRetry = \(\): void =>/);
  });
});
