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

describe('Topic 34.1 — Multi-Page Router App', () => {
  it('renders Home page at /', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
  });

  it('renders About page at /about', () => {
    renderAt('/about');
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
  });

  it('renders Users list at /users', () => {
    renderAt('/users');
    expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument();
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('Bob Markov')).toBeInTheDocument();
  });

  it('renders User detail at /users/:id with useParams', () => {
    renderAt('/users/1');
    expect(screen.getByRole('heading', { name: 'Alice Chen' })).toBeInTheDocument();
    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
  });

  it('shows "User not found" for invalid id', () => {
    renderAt('/users/999');
    expect(screen.getByRole('heading', { name: 'User not found' })).toBeInTheDocument();
  });

  it('renders 404 page for unknown paths', () => {
    renderAt('/nonexistent');
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('Header has NavLink with active class for current route', () => {
    renderAt('/about');
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink.className).toContain('text-cyan-300');

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink.className).not.toContain('text-cyan-300');
  });

  it('navigates from Users list to user detail via Link', async () => {
    renderAt('/users');

    const link = screen.getByRole('link', { name: /Alice Chen/i });
    await userEvent.click(link);

    expect(screen.getByRole('heading', { name: 'Alice Chen' })).toBeInTheDocument();
  });

  it('user detail has a Back button', () => {
    renderAt('/users/2');
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });
});

describe('Topic 34.1 — source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');
  const mainSource = readFileSync(resolve(process.cwd(), 'src/main.tsx'), 'utf8');
  const headerSource = readFileSync(resolve(process.cwd(), 'src/components/header.tsx'), 'utf8');
  const detailSource = readFileSync(resolve(process.cwd(), 'src/pages/user-detail.tsx'), 'utf8');

  it('main.tsx wraps App in BrowserRouter', () => {
    expect(mainSource).toMatch(/BrowserRouter/);
  });

  it('App uses Routes and Route', () => {
    expect(appSource).toMatch(/Routes/);
    expect(appSource).toMatch(/Route/);
  });

  it('Header uses NavLink from react-router-dom', () => {
    expect(headerSource).toMatch(/NavLink/);
    expect(headerSource).toMatch(/react-router-dom/);
  });

  it('UserDetailPage uses useParams and useNavigate', () => {
    expect(detailSource).toMatch(/useParams/);
    expect(detailSource).toMatch(/useNavigate/);
  });
});
