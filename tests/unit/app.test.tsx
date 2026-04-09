import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';

import { App } from '../../src/App';
import { resetUsersStore } from '../../src/lib/fake-api';

describe('Capstone 2 runtime', () => {
  beforeEach(() => {
    resetUsersStore();
  });

  it('requires authentication before showing the dashboard workspace', () => {
    render(<App />);

    expect(screen.getByText(/Sign in to open the protected dashboard/i)).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'User administration' })).not.toBeInTheDocument();
  });

  it('loads, filters, and paginates users after sign in', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByRole('heading', { name: 'User administration' })).toBeInTheDocument();
    expect(await screen.findByText('Anna Stone')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Find by name or email'), {
      target: { value: 'olivia' },
    });

    expect(await screen.findByText('Olivia Hart')).toBeInTheDocument();
    expect(screen.queryByText('Anna Stone')).not.toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue('name'), {
      target: { value: 'status' },
    });

    fireEvent.change(screen.getByPlaceholderText('Find by name or email'), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));

    await waitFor(() => {
      expect(screen.getByText(/Page 2 of/i)).toBeInTheDocument();
    });
  });

  it('validates the edit form with react-hook-form and zod before saving', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    await screen.findByRole('heading', { name: 'User administration' });

    fireEvent.click((await screen.findAllByRole('button', { name: 'Edit' }))[0]);

    const drawer = screen.getByLabelText('Edit user drawer');
    const nameInput = within(drawer).getByLabelText('Name');

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.click(within(drawer).getByRole('button', { name: 'Save changes' }));

    expect(await within(drawer).findByText('Name must be at least 2 characters long')).toBeInTheDocument();
  });

  it('recovers a crashed section through the boundary reset button', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    await screen.findByRole('heading', { name: 'User administration' });

    fireEvent.click(screen.getByRole('button', { name: 'Crash users section' }));

    expect(await screen.findByRole('heading', { name: 'Users section failed' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(await screen.findByRole('heading', { name: 'User administration' })).toBeInTheDocument();
  });
});

describe('Capstone 2 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');
  const contextSource = readFileSync(resolve(process.cwd(), 'src/contexts.tsx'), 'utf8');

  it('uses React Query, contexts, a compound table, and form schema validation', () => {
    expect(appSource).toMatch(/QueryClientProvider/);
    expect(appSource).toMatch(/RequireAuth/);
    expect(appSource).toMatch(/DataTable\.Root/);
    expect(appSource).toMatch(/zodResolver/);
    expect(contextSource).toMatch(/createContext/);
  });

  it('wraps sections in ErrorBoundary components', () => {
    expect(appSource).toMatch(/<ErrorBoundary title="System health">/);
    expect(appSource).toMatch(/<ErrorBoundary title="Users section">/);
  });
});
