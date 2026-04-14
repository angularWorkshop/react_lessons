import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { App } from '../../src/App';

function getDescriptionContent(): string | null {
  return document.head.querySelector('meta[name="description"]')?.getAttribute('content') ?? null;
}

describe('Topic 29.1 runtime', () => {
  beforeEach(() => {
    document.title = '';
    document.head.querySelector('meta[name="description"]')?.remove();
  });

  it('renders the workspace shell with the catalog page active', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'React 19 migration workspace' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Catalog migration board' })).toBeInTheDocument();
  });

  it('focuses the search input through the custom component ref', () => {
    render(<App />);

    const searchInput = screen.getByRole('searchbox', { name: 'Command search' });

    fireEvent.click(screen.getByRole('button', { name: 'Focus search' }));

    expect(searchInput).toHaveFocus();
  });

  it('switches visible content between migration pages', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Guides page' }));

    expect(screen.getByRole('heading', { name: 'Guides upgrade checklist' })).toBeInTheDocument();
  });

  it('updates the page title and description metadata for each screen', () => {
    render(<App />);

    expect(document.title).toBe('React 19 migration | Catalog');
    expect(getDescriptionContent()).toBe('Catalog migration preview with ref-as-prop and contextual styling.');

    fireEvent.click(screen.getByRole('button', { name: 'Guides page' }));

    expect(document.title).toBe('React 19 migration | Guides');
    expect(getDescriptionContent()).toBe('Guides page for replacing legacy provider and ref wrapper usage.');
  });
});

describe('Topic 29.1 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('does not use forwardRef anymore', () => {
    expect(appSource).not.toMatch(/\bforwardRef\s*(<|\()/);
  });

  it('does not use Context.Provider anymore', () => {
    expect(appSource).not.toMatch(/Context\.Provider/);
  });
});
