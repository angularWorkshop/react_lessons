import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { RequireAuth } from '../../src/components/require-auth';
import { RequireRole } from '../../src/components/require-role';
import { AuthProvider } from '../../src/context/auth-context';
import { AdminPage } from '../../src/pages/admin';
import { DashboardPage } from '../../src/pages/dashboard';
import { LoginPage } from '../../src/pages/login';
import { PublicPage } from '../../src/pages/public';

function renderApp(initialEntries: string[] = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <RequireRole role="admin">
                  <AdminPage />
                </RequireRole>
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe('Protected Routes', () => {
  it('redirects unauthenticated user from /dashboard to /login', () => {
    renderApp(['/dashboard']);

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('shows dashboard after login with redirect back', async () => {
    const user = userEvent.setup();

    renderApp(['/dashboard']);

    // Should be on /login with from=/dashboard
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText(/enter your name/i), 'Alice');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(
      screen.getByRole('heading', { name: /dashboard/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/alice/i)).toBeInTheDocument();
  });

  it('shows Access Denied for non-admin user on /admin', async () => {
    const user = userEvent.setup();

    renderApp(['/admin']);

    // Redirected to login
    await user.type(screen.getByPlaceholderText(/enter your name/i), 'Bob');
    // Default role is 'viewer'
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/access denied/i)).toBeInTheDocument();
  });

  it('shows admin page for admin user', async () => {
    const user = userEvent.setup();

    renderApp(['/admin']);

    await user.type(screen.getByPlaceholderText(/enter your name/i), 'Carol');
    await user.selectOptions(screen.getByRole('combobox'), 'admin');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(
      screen.getByRole('heading', { name: /admin panel/i }),
    ).toBeInTheDocument();
  });

  it('redirects authenticated user away from /login to /dashboard', async () => {
    const user = userEvent.setup();

    renderApp(['/login']);

    await user.type(screen.getByPlaceholderText(/enter your name/i), 'Dave');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    // After login from /login (no from param), should go to /dashboard
    expect(
      screen.getByRole('heading', { name: /dashboard/i }),
    ).toBeInTheDocument();
  });

  it('shows public page without authentication', () => {
    renderApp(['/']);

    expect(
      screen.getByRole('heading', { name: /welcome/i }),
    ).toBeInTheDocument();
  });
});
