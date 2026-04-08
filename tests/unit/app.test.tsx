import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 4.1 runtime', () => {
  it('renders all typed button variants', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Typed button props' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save profile' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open draft' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete item' })).toBeInTheDocument();
  });

  it('keeps native button attributes working', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: 'Disabled sync' })).toBeDisabled();
  });
});

describe('Topic 4.1 source checks', () => {
  const buttonPath = resolve(process.cwd(), 'src/components/Button.tsx');
  const buttonSource = readFileSync(buttonPath, 'utf8');

  it('stores the button component in a dedicated file', () => {
    expect(existsSync(buttonPath)).toBe(true);
  });

  it('inherits native button props and forwards rest attributes', () => {
    expect(buttonSource).toMatch(/ComponentPropsWithoutRef<'button'>/);
    expect(buttonSource).toMatch(/\.\.\.rest/);
  });
});
