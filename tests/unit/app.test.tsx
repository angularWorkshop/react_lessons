import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { App, LoggedProfileCard } from '../../src/App';

describe('Topic 17.1 runtime', () => {
  const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

  beforeEach(() => {
    consoleSpy.mockClear();
  });

  it('renders the workspace and wrapped profile card', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'withLogger workspace' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Max' })).toBeInTheDocument();
    expect(screen.getByText('Platform Engineer')).toBeInTheDocument();
  });

  it('logs wrapped component props on render and rerender', () => {
    render(<App />);

    expect(consoleSpy).toHaveBeenCalledWith(
      '[withLogger] render',
      expect.objectContaining({
        name: 'Max',
        role: 'Platform Engineer',
        isOnline: true,
        viewers: 128,
      }),
    );

    fireEvent.click(screen.getByRole('button', { name: 'Add viewer' }));

    expect(screen.getByText('129')).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith(
      '[withLogger] render',
      expect.objectContaining({
        viewers: 129,
      }),
    );
  });

  it('assigns a readable displayName to the wrapped component', () => {
    expect(LoggedProfileCard.displayName).toBe('withLogger(ProfileCard)');
  });
});

describe('Topic 17.1 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('types the HOC through a generic signature', () => {
    expect(appSource).toMatch(/function withLogger<P extends object>\(Component: ComponentType<P>\): ComponentType<P>/);
  });

  it('derives and assigns a displayName for the wrapped component', () => {
    expect(appSource).toMatch(/const componentName = Component\.displayName \|\| Component\.name \|\| 'Component'/);
    expect(appSource).toMatch(/WrappedComponent\.displayName = `withLogger\(\$\{componentName\}\)`/);
  });
});
