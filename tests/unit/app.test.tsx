import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 3.1 runtime', () => {
  it('renders the UI kit exercise shell', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'UI kit components' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Jordan Lee' })).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders the call-to-action buttons', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: 'Message' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument();
  });
});

describe('Topic 3.1 source checks', () => {
  const componentsDir = resolve(process.cwd(), 'src/components');
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('keeps each UI kit primitive in its own file', () => {
    expect(existsSync(resolve(componentsDir, 'Button.tsx'))).toBe(true);
    expect(existsSync(resolve(componentsDir, 'Badge.tsx'))).toBe(true);
    expect(existsSync(resolve(componentsDir, 'Avatar.tsx'))).toBe(true);
    expect(existsSync(resolve(componentsDir, 'Card.tsx'))).toBe(true);
    expect(existsSync(resolve(componentsDir, 'UserCard.tsx'))).toBe(true);
  });

  it('renders the page through UserCard composition', () => {
    expect(appSource).toMatch(/import\s+\{\s*UserCard\s*\}\s+from\s+'\.\/components\/UserCard'/);
    expect(appSource).toMatch(/<UserCard\s*\/>/);
  });
});
