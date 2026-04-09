import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 14.2 runtime', () => {
  it('redirects guests away from the protected dashboard', () => {
    render(<App />);

    expect(screen.getByText('Redirected to /login')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Private dashboard' })).not.toBeInTheDocument();
  });

  it('reveals the protected dashboard after login', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(screen.getByText('Signed in as Max')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Private dashboard' })).toBeInTheDocument();
  });

  it('returns to the redirect state after logout', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));

    expect(screen.getByText('Redirected to /login')).toBeInTheDocument();
  });
});

describe('Topic 14.2 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

  it('splits auth state and auth actions into separate contexts', () => {
    expect(appSource).toMatch(/const AuthStateContext = createContext<AuthStateValue \| undefined>\(undefined\);/);
    expect(appSource).toMatch(/const AuthActionsContext = createContext<AuthActionsValue \| undefined>\(undefined\);/);
  });

  it('guards protected content through RequireAuth', () => {
    expect(appSource).toMatch(/function RequireAuth\(\{ children \}: RequireAuthProps\): ReactElement \{/);
    expect(appSource).toMatch(/return <section className="redirect-panel">/);
    expect(appSource).toMatch(/Redirected to \/login/);
  });
});
