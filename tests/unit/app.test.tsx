import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 4.2 runtime', () => {
  it('renders the card and modal preview', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Children and typed callbacks' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Release checklist' })).toBeInTheDocument();
    expect(screen.getByLabelText('Preview modal')).toBeInTheDocument();
  });

  it('shows the optional footer and the close button', () => {
    render(<App />);

    expect(screen.getByText('Last updated 5 minutes ago')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });
});

describe('Topic 4.2 source checks', () => {
  const cardSource = readFileSync(resolve(process.cwd(), 'src/components/Card.tsx'), 'utf8');
  const modalSource = readFileSync(resolve(process.cwd(), 'src/components/Modal.tsx'), 'utf8');

  it('types children as ReactNode and keeps footer optional', () => {
    expect(cardSource).toMatch(/children:\s*ReactNode/);
    expect(cardSource).toMatch(/footer\?:/);
  });

  it('types onClose as a callback and uses children in Modal', () => {
    expect(modalSource).toMatch(/onClose:\s*\(\)\s*=>\s*void/);
    expect(modalSource).toMatch(/children:\s*ReactNode/);
  });
});
