import type { ReactElement } from 'react';

import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps): ReactElement {
  return (
    <button type="button" className={styles.toggle} onClick={onToggle}>
      {theme === 'light' ? '🌙 Dark mode' : '☀️ Light mode'}
    </button>
  );
}
