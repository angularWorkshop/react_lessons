import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 8.1 runtime', () => {
  it('renders the search input shell', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Autofocus search input' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Search lessons' })).toHaveValue('react hooks');
  });

  it('focuses the input from the parent button', () => {
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Search lessons' });
    fireEvent.click(screen.getByRole('button', { name: 'Focus input' }));

    expect(document.activeElement).toBe(input);
  });
});

describe('Topic 8.1 source checks', () => {
  const searchInputSource = readFileSync(
    resolve(process.cwd(), 'src/components/SearchInput.tsx'),
    'utf8',
  );

  it('types the component with forwardRef<HTMLInputElement, SearchInputProps>', () => {
    expect(searchInputSource).toMatch(
      /forwardRef<HTMLInputElement,\s*SearchInputProps>/,
    );
  });

  it('attaches the forwarded ref to the native input', () => {
    expect(searchInputSource).toMatch(/ref=\{ref\}/);
  });
});
