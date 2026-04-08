import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 7.1 runtime', () => {
  it('renders the title sync shell and updates document.title', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Document title sync' })).toBeInTheDocument();
    expect(document.title).toBe('Clicks: 3');

    fireEvent.click(screen.getByRole('button', { name: 'Increase' }));
    expect(document.title).toBe('Clicks: 4');
  });

  it('restores the original title on unmount', () => {
    document.title = 'EduTec React';

    const { unmount } = render(<App />);
    expect(document.title).toBe('Clicks: 3');

    unmount();

    expect(document.title).toBe('EduTec React');
  });
});

describe('Topic 7.1 source checks', () => {
  const hookSource = readFileSync(
    resolve(process.cwd(), 'src/hooks/useDocumentTitle.ts'),
    'utf8',
  );

  it('extracts the effect into useDocumentTitle(title: string)', () => {
    expect(hookSource).toMatch(/export function useDocumentTitle\(title: string\)/);
  });

  it('stores and restores the previous title in cleanup', () => {
    expect(hookSource).toMatch(/const previousTitle = document\.title/);
    expect(hookSource).toMatch(/return \(\) => \{\s*document\.title = previousTitle;/s);
  });
});
