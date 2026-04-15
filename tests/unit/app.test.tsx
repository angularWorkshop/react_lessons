import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { App } from '../../src/App';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('Topic 35.1 — Nested Routes & Outlet', () => {
  it('renders dashboard index inside MainLayout with header and sidebar', () => {
    renderAt('/dashboard');

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
  });

  it('renders /dashboard/stats inside MainLayout', () => {
    renderAt('/dashboard/stats');

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Stats' })).toBeInTheDocument();
    expect(screen.getByText('Total Users')).toBeInTheDocument();
  });

  it('renders /dashboard/users inside MainLayout', () => {
    renderAt('/dashboard/users');

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument();
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
  });

  it('renders /login inside AuthLayout without sidebar', () => {
    renderAt('/login');

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  it('sidebar has NavLinks for dashboard sections', () => {
    renderAt('/dashboard');

    expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Stats' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Users' })).toBeInTheDocument();
  });

  it('clicking sidebar link navigates within dashboard', async () => {
    renderAt('/dashboard');

    await userEvent.click(screen.getByRole('link', { name: 'Stats' }));

    expect(screen.getByRole('heading', { name: 'Stats' })).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('unknown paths show 404 without any layout', () => {
    renderAt('/nonexistent');

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
  });
});

describe('Topic 35.1 — source checks', () => {
  const mainLayoutSource = readFileSync(resolve(process.cwd(), 'src/layouts/main-layout.tsx'), 'utf8');
  const authLayoutSource = readFileSync(resolve(process.cwd(), 'src/layouts/auth-layout.tsx'), 'utf8');
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('MainLayout uses Outlet from react-router-dom', () => {
    expect(mainLayoutSource).toMatch(/Outlet/);
    expect(mainLayoutSource).toMatch(/react-router-dom/);
  });

  it('AuthLayout uses Outlet from react-router-dom', () => {
    expect(authLayoutSource).toMatch(/Outlet/);
    expect(authLayoutSource).toMatch(/react-router-dom/);
  });

  it('MainLayout renders <Outlet /> in JSX', () => {
    expect(mainLayoutSource).toMatch(/<Outlet\s*\/>/);
  });

  it('AuthLayout renders <Outlet /> in JSX', () => {
    expect(authLayoutSource).toMatch(/<Outlet\s*\/>/);
  });

  it('App uses nested Route structure', () => {
    expect(appSource).toMatch(/MainLayout/);
    expect(appSource).toMatch(/AuthLayout/);
    expect(appSource).toMatch(/dashboard\/stats/);
    expect(appSource).toMatch(/dashboard\/users/);
  });
});
