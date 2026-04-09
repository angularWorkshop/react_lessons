import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 15.1 runtime', () => {
  it('renders the fetch shell', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'useFetch with request races' })).toBeInTheDocument();
  });

  it('prevents stale slow requests from overwriting the fast response', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Load slow profile' }));
    fireEvent.click(screen.getByRole('button', { name: 'Load fast profile' }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Grace Hopper' })).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Grace Hopper' })).toBeInTheDocument();
    }, { timeout: 160 });
  });
});

describe('Topic 15.1 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('creates AbortController inside the effect', () => {
    expect(appSource).toMatch(/const controller = new AbortController\(\);/);
    expect(appSource).toMatch(/const response = await fetchUserProfile\(url, controller\.signal\);/);
  });

  it('aborts the previous request in cleanup', () => {
    expect(appSource).toMatch(/return \(\): void => \{/);
    expect(appSource).toMatch(/controller\.abort\(\);/);
  });
});
