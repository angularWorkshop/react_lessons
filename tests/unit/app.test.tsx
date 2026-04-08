import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 10.1 runtime', () => {
  it('renders the async view shell and idle state', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Async view component' })).toBeInTheDocument();
    expect(screen.getByText('Choose a state to preview the async view.')).toBeInTheDocument();
  });

  it('renders loading, success, and error branches', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Show loading' }));
    expect(screen.getByLabelText('Loading skeleton')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Show data' }));
    expect(screen.getByText('State Machines in UI')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Show error' }));
    expect(screen.getByText('Failed to load recommended lessons.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('uses the retry callback from the error branch', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Show error' }));
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));

    expect(screen.getByLabelText('Loading skeleton')).toBeInTheDocument();
  });
});

describe('Topic 10.1 source checks', () => {
  const asyncViewSource = readFileSync(
    resolve(process.cwd(), 'src/components/AsyncView.tsx'),
    'utf8',
  );

  it('declares AsyncView as a generic component', () => {
    expect(asyncViewSource).toMatch(/interface AsyncViewProps<T>/);
    expect(asyncViewSource).toMatch(/export function AsyncView<T>\(/);
  });

  it('uses an exhaustive never check for the async state switch', () => {
    expect(asyncViewSource).toMatch(/const exhaustiveCheck: never = state;/);
  });
});
