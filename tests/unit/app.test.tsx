import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 2.2 runtime', () => {
  it('renders the profile heading and the card copy', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Dynamic JSX profile' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ada Lovelace' })).toBeInTheDocument();
    expect(screen.getByText('Frontend engineer')).toBeInTheDocument();
  });

  it('renders a typed status label and a linked form field', () => {
    render(<App />);

    expect(screen.getByText('online')).toHaveStyle({ color: 'rgb(22, 163, 74)' });
    expect(screen.getByLabelText('Status note')).toHaveValue('Ready to review JSX output.');
  });
});

describe('Topic 2.2 source checks', () => {
  const profileCardSource = readFileSync(
    resolve(process.cwd(), 'src/components/ProfileCard.tsx'),
    'utf8',
  );
  const returnBlock = profileCardSource.match(/return \(([\s\S]*?)\);\n}/)?.[1] ?? '';

  it('uses a typed CSSProperties object for the status style', () => {
    expect(profileCardSource).toMatch(/CSSProperties/);
    expect(profileCardSource).toMatch(/statusStyle:\s*CSSProperties/);
  });

  it('keeps presentation strings out of the returned JSX', () => {
    expect(returnBlock).not.toMatch(/Ada Lovelace/);
    expect(returnBlock).not.toMatch(/Frontend engineer/);
    expect(returnBlock).not.toMatch(/online/);
  });
});
