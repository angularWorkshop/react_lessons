import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 32.1 — Button with CVA', () => {
  it('renders the heading and base buttons', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Button with CVA' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Secondary' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Small' })).toBeInTheDocument();
  });

  it('shows all required variants and sizes in the showcase', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: 'Danger' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Large' })).toBeInTheDocument();
  });

  it('allows custom className to override the default button background', () => {
    render(<App />);

    const custom = screen.getByRole('button', { name: 'Custom class' });
    expect(custom.className).toContain('bg-white');
    expect(custom.className).not.toContain('bg-cyan-400');
  });
});

describe('Topic 32.1 — source checks', () => {
  const buttonSource = readFileSync(resolve(process.cwd(), 'src/components/button.tsx'), 'utf8');
  const utilsSource = readFileSync(resolve(process.cwd(), 'src/lib/utils.ts'), 'utf8');
  const packageSource = readFileSync(resolve(process.cwd(), 'package.json'), 'utf8');
  const viteSource = readFileSync(resolve(process.cwd(), 'vite.config.ts'), 'utf8');

  it('uses cva with typed variants', () => {
    expect(buttonSource).toMatch(/cva\(/);
    expect(buttonSource).toMatch(/VariantProps/);
  });

  it('keeps Tailwind connected through the vite plugin', () => {
    expect(packageSource).toMatch(/@tailwindcss\/vite/);
    expect(packageSource).toMatch(/tailwindcss/);
    expect(viteSource).toMatch(/@tailwindcss\/vite/);
    expect(viteSource).toMatch(/tailwindcss\(\)/);
  });

  it('uses clsx and tailwind-merge together in cn()', () => {
    expect(utilsSource).toMatch(/clsx/);
    expect(utilsSource).toMatch(/tailwind-merge/);
    expect(utilsSource).toMatch(/twMerge/);
  });
});
