import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen, within } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 2.1 runtime', () => {
  it('renders both JSX and manual comparison panels', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'JSX and createElement' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('JSX example')).toBeInTheDocument();
    expect(screen.getByLabelText('createElement example')).toBeInTheDocument();
  });

  it('renders the same content in both panels', () => {
    render(<App />);

    const jsxSection = screen.getByLabelText('JSX example');
    const manualSection = screen.getByLabelText('createElement example');

    expect(within(jsxSection).getByText('How JSX maps to React')).toBeInTheDocument();
    expect(within(manualSection).getByText('How JSX maps to React')).toBeInTheDocument();
    expect(within(jsxSection).getAllByRole('listitem').map((item) => item.textContent)).toEqual(
      within(manualSection).getAllByRole('listitem').map((item) => item.textContent),
    );
  });
});

describe('Topic 2.1 source checks', () => {
  const createElementSource = readFileSync(
    resolve(process.cwd(), 'src/components/CreateElementGreeting.tsx'),
    'utf8',
  );

  it('uses React.createElement for the manual version', () => {
    expect(createElementSource).toMatch(/React\.createElement\(/);
  });

  it('uses React.Fragment instead of an extra wrapper element', () => {
    expect(createElementSource).toMatch(/React\.Fragment/);
    expect(createElementSource).not.toMatch(/manual-wrapper/);
  });
});
