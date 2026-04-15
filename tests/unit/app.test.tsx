import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 31.1 — First Tailwind Page', () => {
  it('renders the page heading and all user cards', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'First Tailwind Page' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ava Patel' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Jordan Kim' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Mia Chen' })).toBeInTheDocument();
  });

  it('shows profile roles and tags', () => {
    render(<App />);

    expect(screen.getByText('Design Systems Engineer')).toBeInTheDocument();
    expect(screen.getByText('Frontend Platform Lead')).toBeInTheDocument();
    expect(screen.getByText('Product UI Developer')).toBeInTheDocument();

    expect(screen.getByText('Tokens')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
    expect(screen.getByText('Motion')).toBeInTheDocument();
  });

  it('uses a responsive grid that becomes three columns on desktop', () => {
    render(<App />);

    const grid = screen.getByTestId('profiles-grid');
    expect(grid.className).toContain('grid-cols-1');
    expect(grid.className).toContain('md:grid-cols-3');
  });

  it('uses group-based hover styling on profile cards', () => {
    render(<App />);

    const card = screen.getByRole('heading', { name: 'Ava Patel' }).closest('article');
    expect(card?.className).toContain('group');
  });
});

describe('Topic 31.1 — source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');
  const stylesSource = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8');
  const viteSource = readFileSync(resolve(process.cwd(), 'vite.config.ts'), 'utf8');
  const packageSource = readFileSync(resolve(process.cwd(), 'package.json'), 'utf8');

  it('connects Tailwind through vite plugin and stylesheet import', () => {
    expect(packageSource).toMatch(/@tailwindcss\/vite/);
    expect(packageSource).toMatch(/tailwindcss/);
    expect(viteSource).toMatch(/@tailwindcss\/vite/);
    expect(viteSource).toMatch(/tailwindcss\(\)/);
    expect(stylesSource).toMatch(/@import\s+["']tailwindcss["']/);
  });

  it('uses group-hover utilities in source', () => {
    expect(appSource).toMatch(/group-hover:/);
  });

  it('does not rely on inline styles for layout', () => {
    expect(appSource).not.toMatch(/style=\{\{/);
  });
});
