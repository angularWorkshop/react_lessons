import type { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/login', label: 'Login' },
];

export function Header(): ReactElement {
  return (
    <header className="border-b border-white/10 bg-slate-900" data-testid="header">
      <nav className="flex items-center gap-6 px-6 py-4">
        <span className="text-lg font-bold text-white">LayoutApp</span>
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `transition-colors text-sm font-medium ${isActive ? 'text-cyan-300' : 'text-slate-400 hover:text-white'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
