import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen, within } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 8.2 runtime', () => {
  it('renders current and previous values', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'usePrevious hook' })).toBeInTheDocument();
    const previousCard = screen.getByText('Previous value').parentElement;

    expect(screen.getByText('Current value')).toBeInTheDocument();
    expect(previousCard).not.toBeNull();
    expect(within(previousCard as HTMLElement).getByText('none')).toBeInTheDocument();
  });

  it('shows the previous counter value after an update', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Increase' }));

    const currentCard = screen.getByText('Current value').parentElement;
    const previousCard = screen.getByText('Previous value').parentElement;

    expect(currentCard).not.toBeNull();
    expect(previousCard).not.toBeNull();
    expect(within(currentCard as HTMLElement).getByText('6')).toBeInTheDocument();
    expect(within(previousCard as HTMLElement).getByText('5')).toBeInTheDocument();
  });
});

describe('Topic 8.2 source checks', () => {
  const hookSource = readFileSync(
    resolve(process.cwd(), 'src/hooks/usePrevious.ts'),
    'utf8',
  );

  it('declares a generic usePrevious<T>(value: T): T | undefined hook', () => {
    expect(hookSource).toMatch(
      /export function usePrevious<T>\(value: T\): T \| undefined/,
    );
  });

  it('stores the value in a ref instead of state', () => {
    expect(hookSource).toMatch(/useRef<T \| undefined>\(undefined\)/);
    expect(hookSource).toMatch(/return previousRef\.current/);
  });
});
