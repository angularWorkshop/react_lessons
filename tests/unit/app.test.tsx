import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';
import { INITIAL_STATE, machineReducer, type AsyncState } from '../../src/machineReducer';

describe('Topic 12.2 runtime', () => {
  it('renders the reducer machine in idle state', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Reducer state machine' })).toBeInTheDocument();
    expect(screen.getByText('Current status: idle')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start loading' })).toBeInTheDocument();
  });

  it('moves from idle to loading to success', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Start loading' }));
    expect(screen.getByText('Current status: loading')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Resolve request' }));
    expect(screen.getByText('Current status: success')).toBeInTheDocument();
    expect(screen.getByText('React Docs')).toBeInTheDocument();
  });

  it('goes through error and requires reset before success', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Start loading' }));
    fireEvent.click(screen.getByRole('button', { name: 'Reject request' }));
    expect(screen.getByText('Current status: error')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Resolve anyway' }));
    expect(screen.getByText('Current status: error')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Reset machine' }));
    expect(screen.getByText('Current status: idle')).toBeInTheDocument();
  });
});

describe('Topic 12.2 reducer', () => {
  it('keeps invalid error -> success transitions blocked inside the reducer', () => {
    const errorState: AsyncState = { status: 'error', message: 'Request failed.' };

    expect(machineReducer(errorState, { type: 'RESOLVE', data: ['React Docs'] })).toEqual(
      errorState,
    );
  });

  it('resets back to the initial state', () => {
    expect(machineReducer({ status: 'success', data: ['Done'] }, { type: 'RESET' })).toEqual(
      INITIAL_STATE,
    );
  });
});

describe('Topic 12.2 source checks', () => {
  const reducerSource = readFileSync(resolve(process.cwd(), 'src/machineReducer.ts'), 'utf8');

  it('uses a status-to-action map for valid transitions', () => {
    expect(reducerSource).toMatch(/type ActionByStatus = {/);
    expect(reducerSource).toMatch(/error:\s*\{ type: 'RESET' \}/);
    expect(reducerSource).toMatch(
      /function transition<S extends AsyncState>\(state: S, action: ActionByStatus\[S\['status'\]\]\)/,
    );
  });
});
