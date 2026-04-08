import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { App } from '../../src/App';
import {
  getSocketLifecycleEvents,
  resetSocketLifecycleEvents,
} from '../../src/socket';

describe('Topic 7.2 runtime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    resetSocketLifecycleEvents();
  });

  afterEach(() => {
    vi.useRealTimers();
    resetSocketLifecycleEvents();
  });

  it('renders the socket shell and receives messages', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'WebSocket subscription' })).toBeInTheDocument();
    expect(screen.getByText('connect:wss://alpha.edutec.dev')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('Ping from wss://alpha.edutec.dev')).toBeInTheDocument();
  });

  it('reconnects when the URL changes', () => {
    render(<App />);

    fireEvent.change(screen.getByRole('combobox', { name: 'Socket URL' }), {
      target: { value: 'wss://beta.edutec.dev' },
    });

    expect(getSocketLifecycleEvents()).toEqual([
      'connect:wss://alpha.edutec.dev',
      'disconnect:wss://alpha.edutec.dev',
      'connect:wss://beta.edutec.dev',
    ]);
  });

  it('disconnects on unmount', () => {
    const { unmount } = render(<App />);

    unmount();

    expect(getSocketLifecycleEvents()).toContain('disconnect:wss://alpha.edutec.dev');
  });
});

describe('Topic 7.2 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('depends on selectedUrl in useEffect', () => {
    expect(appSource).toMatch(/\}, \[selectedUrl\]\);/);
  });

  it('returns cleanup that disconnects the current socket', () => {
    expect(appSource).toMatch(/return \(\) => \{\s*connection\.disconnect\(\);/s);
  });
});
