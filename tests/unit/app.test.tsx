import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 15.2 runtime', () => {
  it('renders todos through useQuery', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Refactor hooks')).toBeInTheDocument();
      expect(screen.getByText('Ship type-safe forms')).toBeInTheDocument();
    });
  });

  it('shows optimistic todo items before the server confirms them', async () => {
    render(<App />);

    fireEvent.change(screen.getByRole('textbox', { name: 'Todo title' }), {
      target: { value: 'Ship optimistic UI' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add todo' }));

    await waitFor(() => {
      expect(screen.getByText('Ship optimistic UI')).toBeInTheDocument();
    });
  });

  it('rolls back optimistic updates when the mutation fails', async () => {
    render(<App />);

    fireEvent.change(screen.getByRole('textbox', { name: 'Todo title' }), {
      target: { value: 'fail rollback' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add todo' }));

    await waitFor(() => {
      expect(screen.getByText('fail rollback')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('fail rollback')).not.toBeInTheDocument();
      expect(screen.getByText(/Server rejected the todo/)).toBeInTheDocument();
    });
  });
});

describe('Topic 15.2 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('uses TanStack Query hooks', () => {
    expect(appSource).toMatch(/useQuery/);
    expect(appSource).toMatch(/useMutation/);
    expect(appSource).toMatch(/QueryClientProvider/);
  });

  it('adds optimistic updates and rollback handlers', () => {
    expect(appSource).toMatch(/onMutate: async \(title: string\)/);
    expect(appSource).toMatch(/queryClientApi\.setQueryData<TodoItem\[]>\(TODOS_QUERY_KEY/);
    expect(appSource).toMatch(/onError: \(_error, _title, context\)/);
  });

  it('invalidates the todos query after mutations', () => {
    expect(appSource).toMatch(/invalidateQueries\(\{ queryKey: TODOS_QUERY_KEY \}\)/);
  });
});
