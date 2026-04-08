import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 9.1 runtime', () => {
  it('renders the draft list shell', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Index key bug' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Draft for Alpha' })).toHaveValue('Plan docs');
  });

  it('keeps the edited draft attached to the same item after prepend', () => {
    render(<App />);

    fireEvent.change(screen.getByRole('textbox', { name: 'Draft for Beta' }), {
      target: { value: 'Edited Beta draft' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Prepend item' }));

    expect(screen.getByRole('textbox', { name: 'Draft for Delta' })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: 'Draft for Alpha' })).toHaveValue('Plan docs');
    expect(screen.getByRole('textbox', { name: 'Draft for Beta' })).toHaveValue(
      'Edited Beta draft',
    );
  });
});

describe('Topic 9.1 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('uses a stable domain id as the list key', () => {
    expect(appSource).toMatch(/key=\{item\.id\}/);
  });

  it('documents why the stable key matters', () => {
    expect(appSource).toMatch(/Stable id keys keep row-local input state attached/);
  });
});
