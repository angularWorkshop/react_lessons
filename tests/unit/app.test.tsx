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

describe('Topic 34.2 — Navigate State', () => {
  it('Users page shows a list of clickable user buttons', () => {
    renderAt('/users');
    expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Alice Chen/i })).toBeInTheDocument();
  });

  it('clicking a user navigates to /user-profile with state', async () => {
    renderAt('/users');

    await userEvent.click(screen.getByRole('button', { name: /Alice Chen/i }));

    expect(screen.getByRole('heading', { name: 'Alice Chen' })).toBeInTheDocument();
    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText(/ID:\s*1/)).toBeInTheDocument();
  });

  it('profile page shows user data received via state', async () => {
    renderAt('/users');

    await userEvent.click(screen.getByRole('button', { name: /Bob Markov/i }));

    expect(screen.getByRole('heading', { name: 'Bob Markov' })).toBeInTheDocument();
    expect(screen.getByText('Product Designer')).toBeInTheDocument();
  });

  it('profile page shows fallback when accessed directly without state', () => {
    renderAt('/user-profile');

    expect(screen.getByRole('heading', { name: /no user selected/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go to users/i })).toBeInTheDocument();
  });

  it('profile page has a Back button', async () => {
    renderAt('/users');
    await userEvent.click(screen.getByRole('button', { name: /Clara Ruiz/i }));

    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });
});

describe('Topic 34.2 — source checks', () => {
  const usersSource = readFileSync(resolve(process.cwd(), 'src/pages/users.tsx'), 'utf8');
  const profileSource = readFileSync(resolve(process.cwd(), 'src/pages/user-profile.tsx'), 'utf8');

  it('Users page uses useNavigate', () => {
    expect(usersSource).toMatch(/useNavigate/);
  });

  it('Users page passes state in navigate call', () => {
    expect(usersSource).toMatch(/state/);
    expect(usersSource).toMatch(/navigate\(/);
  });

  it('Profile page uses useLocation to read state', () => {
    expect(profileSource).toMatch(/useLocation/);
    expect(profileSource).toMatch(/\.state/);
  });

  it('Profile page types the state', () => {
    expect(profileSource).toMatch(/ProfileState/);
  });
});
