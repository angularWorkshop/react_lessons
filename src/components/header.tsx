import type { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../context/auth-context';

export function Header(): ReactElement {
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </nav>

      <div className="user-info">
        {user ? (
          <>
            <span>
              {user.name} ({user.role})
            </span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </header>
  );
}
