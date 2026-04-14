import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 30.2 — Dark theme', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders the app with theme toggle', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Dark theme with CSS variables' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /dark mode/i })).toBeInTheDocument();
  });

  it('sets data-theme="dark" on documentElement when toggled', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /dark mode/i }));

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument();
  });

  it('toggles back to light when clicked again', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /dark mode/i }));
    fireEvent.click(screen.getByRole('button', { name: /light mode/i }));

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(screen.getByRole('button', { name: /dark mode/i })).toBeInTheDocument();
  });

  it('renders info cards with themed content', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'CSS Custom Properties' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'No component changes' })).toBeInTheDocument();
  });
});

describe('Topic 30.2 — source checks', () => {
  const stylesSource = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8');
  const hookSource = readFileSync(resolve(process.cwd(), 'src/hooks/use-theme.ts'), 'utf8');
  const cardCss = readFileSync(resolve(process.cwd(), 'src/components/InfoCard.module.css'), 'utf8');

  it('defines CSS custom properties on :root', () => {
    expect(stylesSource).toMatch(/--color-bg:/);
    expect(stylesSource).toMatch(/--color-surface:/);
    expect(stylesSource).toMatch(/--color-text:/);
    expect(stylesSource).toMatch(/--color-border:/);
  });

  it('has dark theme overrides via data-theme selector', () => {
    expect(stylesSource).toMatch(/\[data-theme=["']dark["']\]/);
  });

  it('hook sets data-theme attribute on documentElement', () => {
    expect(hookSource).toMatch(/documentElement/);
    expect(hookSource).toMatch(/setAttribute.*data-theme/);
  });

  it('component CSS uses var() not hardcoded colors', () => {
    expect(cardCss).toMatch(/var\(--color-/);
    expect(cardCss).not.toMatch(/#[0-9a-fA-F]{3,8}/);
  });
});
