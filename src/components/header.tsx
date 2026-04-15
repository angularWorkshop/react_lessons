import type { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/users', label: 'Users' },
];

export function Header(): ReactElement {
  return (
    <header className="border-b border-white/10 bg-slate-900">
      <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-4">
        <span className="text-lg font-bold text-white">RouterApp</span>
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
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
