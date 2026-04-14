import { useCallback, useState } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      // TODO: apply the theme to the HTML element so CSS picks it up
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
