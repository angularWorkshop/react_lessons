import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
  type ReactElement,
} from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
}

interface AuthUser {
  id: string;
  name: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: () => void;
  logout: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren): ReactElement {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
      },
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div className="theme-root" data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function AuthProvider({ children }: PropsWithChildren): ReactElement {
  const [user, setUser] = useState<AuthUser | null>(null);
  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: () => {
        setUser({ id: 'auth-1', name: 'Dashboard Admin' });
      },
      logout: () => {
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return value;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return value;
}
