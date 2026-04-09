import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App, ThemePreviewBadge } from '../../src/App';

describe('Topic 14.1 runtime', () => {
  it('renders the theme workspace', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Theme context workspace' })).toBeInTheDocument();
    expect(screen.getByText('Theme: light')).toBeInTheDocument();
  });

  it('toggles the theme through context state', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark' }));

    expect(screen.getByText('Theme: dark')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Dark surface' })).toBeInTheDocument();
  });

  it('throws when a context consumer is rendered outside the provider', () => {
    expect(() => render(<ThemePreviewBadge />)).toThrow('useTheme must be used within ThemeProvider');
  });
});

describe('Topic 14.1 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('creates a typed context with undefined as the initial value', () => {
    expect(appSource).toMatch(/const ThemeContext = createContext<ThemeContextValue \| undefined>\(undefined\);/);
  });

  it('throws from the custom hook when the provider is missing', () => {
    expect(appSource).toMatch(/export function useTheme\(\): ThemeContextValue \{/);
    expect(appSource).toMatch(/throw new Error\('useTheme must be used within ThemeProvider'\);/);
  });

  it('avoids prop drilling theme state through Header and ThemeCard props', () => {
    expect(appSource).not.toMatch(/<Header theme=/);
    expect(appSource).not.toMatch(/<ThemeCard theme=/);
  });
});
