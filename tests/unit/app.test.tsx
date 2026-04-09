import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 13.2 runtime', () => {
  it('renders the memoized child actions shell', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Memoized child actions' })).toBeInTheDocument();
    expect(screen.getByText('Selected lesson: hooks')).toBeInTheDocument();
  });

  it('updates the selected lesson through the child callback', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Profiling' }));

    expect(screen.getByText('Selected lesson: profiling')).toBeInTheDocument();
  });

  it('keeps the memoized child stable on unrelated parent renders', () => {
    render(<App />);

    expect(screen.getByText('Child renders: 1')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Toggle sidebar off' }));

    expect(screen.getByText('Child renders: 1')).toBeInTheDocument();
  });
});

describe('Topic 13.2 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('wraps the child with React.memo', () => {
    expect(appSource).toMatch(/const MemoizedLessonChips = memo\(function MemoizedLessonChips/);
  });

  it('stabilizes the callback with useCallback', () => {
    expect(appSource).toMatch(/import \{ memo, useCallback, useRef, useState, type ReactElement \} from 'react';/);
    expect(appSource).toMatch(/const handleSelect = useCallback\(\(nextId: string\): void => \{/);
    expect(appSource).toMatch(/\}, \[\]\);/);
  });
});
