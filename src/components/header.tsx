import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/auth-store';

export function Header() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="header">
      <nav className="header__nav">
        <NavLink to="/board" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Board
        </NavLink>
        <NavLink to="/create" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          New Task
        </NavLink>
      </nav>
      {user && (
        <div className="header__user">
          <span>{user.name} ({user.role})</span>
          <button className="btn-small" onClick={logout}>Logout</button>
        </div>
      )}
    </header>
  );
}
