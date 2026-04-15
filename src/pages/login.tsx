import { type FormEvent, type ReactElement, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '../context/auth-context';
import type { Role } from '../types/auth';

const ROLES: Role[] = ['admin', 'editor', 'viewer'];

export function LoginPage(): ReactElement {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('viewer');

  // TODO: Read the `from` search parameter. If it is not present,
  // default to '/dashboard'.

  // TODO: If the user is already authenticated, redirect them away
  // from the login page using <Navigate to={...} replace />.

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();

    if (!name.trim()) return;

    login(name.trim(), role);
    // TODO: After login, navigate to the `from` path so the user
    // returns to the page they originally requested.
  }

  return (
    <div className="page">
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>

        <label>
          Role
          <select value={role} onChange={(e) => setRole(e.target.value as Role)}>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
