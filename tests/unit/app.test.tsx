import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 5.2 runtime', () => {
  it('renders the polymorphic preview shell', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Polymorphic button' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit form' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open docs' })).toBeInTheDocument();
    expect(screen.getByText('Static badge')).toBeInTheDocument();
  });
});

describe('Topic 5.2 source checks', () => {
  const buttonSource = readFileSync(resolve(process.cwd(), 'src/components/Button.tsx'), 'utf8');

  it('uses discriminated union props for anchor and button modes', () => {
    expect(buttonSource).toMatch(/type ButtonAsAnchorProps/);
    expect(buttonSource).toMatch(/type ButtonAsNativeProps/);
  });

  it('forbids invalid prop combinations with never', () => {
    expect(buttonSource).toMatch(/href\?:\s*never/);
    expect(buttonSource).toMatch(/type\?:\s*never/);
  });
});
