import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'edutec-theme';

function getInitialTheme(): Theme {
  // TODO: read saved theme from localStorage (key: STORAGE_KEY)
  // TODO: if nothing saved, detect system preference via matchMedia('(prefers-color-scheme: dark)')
  // TODO: return 'dark' or 'light' accordingly
  return 'light';
}

function applyThemeToDOM(theme: Theme): void {
  // TODO: add or remove class 'dark' on document.documentElement
  // TODO: if theme is 'dark', add class 'dark'; otherwise remove it
  void theme;
}

export function ThemeProvider({ children }: { children: ReactNode }): ReactElement {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      // TODO: save the new theme to localStorage
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return ctx;
}
