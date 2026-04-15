import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 31.2 — Custom Tailwind Theme', () => {
  it('renders the branded hero content', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Custom Tailwind Theme' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Launch preview' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Brand colors' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Custom radius' })).toBeInTheDocument();
  });

  it('uses custom brand utility classes in the hero and grid', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: 'Launch preview' }).className).toContain('bg-brand-600');
    expect(screen.getByTestId('brand-hero').className).toContain('rounded-panel');
    expect(screen.getByTestId('brand-hero').className).toContain('shadow-panel');
    expect(screen.getByTestId('theme-grid').className).toContain('xs:grid-cols-2');
  });
});

describe('Topic 31.2 — source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');
  const stylesSource = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8');
  const configSource = readFileSync(resolve(process.cwd(), 'tailwind.config.ts'), 'utf8');
  const viteSource = readFileSync(resolve(process.cwd(), 'vite.config.ts'), 'utf8');

  it('keeps Tailwind connected through the vite plugin and @config stylesheet directive', () => {
    expect(viteSource).toMatch(/@tailwindcss\/vite/);
    expect(viteSource).toMatch(/tailwindcss\(\)/);
    expect(stylesSource).toMatch(/@config\s+["']\.\.\/tailwind\.config\.ts["']/);
    expect(stylesSource).toMatch(/@import\s+["']tailwindcss["']/);
  });

  it('extends the theme with brand tokens', () => {
    expect(configSource).toMatch(/colors:\s*\{/);
    expect(configSource).toMatch(/brand:/);
    expect(configSource).toMatch(/fontFamily:\s*\{/);
    expect(configSource).toMatch(/display:/);
    expect(configSource).toMatch(/boxShadow:\s*\{/);
    expect(configSource).toMatch(/panel:/);
    expect(configSource).toMatch(/borderRadius:\s*\{/);
    expect(configSource).toMatch(/screens:\s*\{/);
    expect(configSource).toMatch(/xs:/);
  });

  it('uses the custom theme utilities in the app source', () => {
    expect(appSource).toMatch(/bg-brand-600/);
    expect(appSource).toMatch(/font-display/);
    expect(appSource).toMatch(/rounded-panel/);
    expect(appSource).toMatch(/shadow-panel/);
    expect(appSource).toMatch(/xs:grid-cols-2/);
  });
});
