import type { ReactElement } from 'react';

import { useTheme } from '../context/theme';

export function ThemeToggle(): ReactElement {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 dark:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
