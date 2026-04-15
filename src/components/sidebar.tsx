import type { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/dashboard/stats', label: 'Stats', end: false },
  { to: '/dashboard/users', label: 'Users', end: false },
];

export function Sidebar(): ReactElement {
  return (
    <aside className="w-56 shrink-0 border-r border-white/10 bg-slate-900/50 p-4" data-testid="sidebar">
      <nav className="flex flex-col gap-1">
        {links.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? 'bg-cyan-400/10 text-cyan-300' : 'text-slate-400 hover:text-white'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
