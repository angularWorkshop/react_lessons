import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { App } from '../../src/App';
import { ThemeProvider } from '../../src/context/theme';

function renderApp() {
  return render(
    <ThemeProvider>
      <App />
    </ThemeProvider>,
  );
}

describe('Topic 33.1 — Dark Theme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('renders the page heading and theme toggle', () => {
    renderApp();

    expect(screen.getByRole('heading', { name: 'Dark Theme' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /switch to/i })).toBeInTheDocument();
  });

  it('renders all UI kit sections', () => {
    renderApp();

    expect(screen.getByRole('heading', { name: 'Buttons' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Badges' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Inputs' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Alerts' })).toBeInTheDocument();
  });

  it('toggles dark class on <html> when the theme button is clicked', async () => {
    renderApp();

    const toggle = screen.getByRole('button', { name: /switch to/i });
    await userEvent.click(toggle);

    expect(document.documentElement.classList.contains('dark')).toBe(true);

    await userEvent.click(toggle);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists theme choice to localStorage', async () => {
    renderApp();

    const toggle = screen.getByRole('button', { name: /switch to/i });
    await userEvent.click(toggle);

    expect(localStorage.getItem('edutec-theme')).toBe('dark');
  });

  it('reads saved theme from localStorage on mount', () => {
    localStorage.setItem('edutec-theme', 'dark');

    renderApp();

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('detects system preference when no saved theme exists', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });

    renderApp();

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});

describe('Topic 33.1 — source checks', () => {
  const themeSource = readFileSync(resolve(process.cwd(), 'src/context/theme.tsx'), 'utf8');
  const stylesSource = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8');
  const buttonSource = readFileSync(resolve(process.cwd(), 'src/components/button.tsx'), 'utf8');
  const cardSource = readFileSync(resolve(process.cwd(), 'src/components/card.tsx'), 'utf8');
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('styles.css configures dark variant via @custom-variant', () => {
    expect(stylesSource).toMatch(/@custom-variant\s+dark/);
  });

  it('ThemeProvider uses localStorage for persistence', () => {
    expect(themeSource).toMatch(/localStorage/);
  });

  it('ThemeProvider detects prefers-color-scheme', () => {
    expect(themeSource).toMatch(/prefers-color-scheme/);
  });

  it('components use dark: prefix for theme-aware styling', () => {
    expect(buttonSource).toMatch(/dark:/);
    expect(cardSource).toMatch(/dark:/);
  });

  it('App uses transition-colors for smooth theme switching', () => {
    expect(appSource).toMatch(/transition-colors/);
  });
});
