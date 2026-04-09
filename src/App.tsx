import { createContext, useContext, useMemo, useState, type ReactElement, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}

function ThemeProvider({ children }: ThemeProviderProps): ReactElement {
  const [theme, setTheme] = useState<Theme>('light');

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((current) => (current === 'light' ? 'dark' : 'light'));
      },
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function Header(): ReactElement {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">Topic 14.1</p>
        <h1>Theme context workspace</h1>
      </div>

      <button type="button" className="theme-toggle" onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'}
      </button>
    </header>
  );
}

function ThemeCard(): ReactElement {
  const { theme } = useTheme();

  return (
    <article className={theme === 'dark' ? 'preview-card preview-card--dark' : 'preview-card preview-card--light'}>
      <p className="card-label">Current theme</p>
      <h2>{theme === 'light' ? 'Light surface' : 'Dark surface'}</h2>
      <p className="description">
        Buttons and cards should react to the active theme without passing theme props through the whole tree.
      </p>
    </article>
  );
}

export function ThemePreviewBadge(): ReactElement {
  const { theme } = useTheme();

  return <span className="theme-badge">Theme: {theme}</span>;
}

function ThemeWorkspace(): ReactElement {
  const { theme } = useTheme();

  return (
    <section className={theme === 'dark' ? 'theme-shell theme-shell--dark' : 'theme-shell theme-shell--light'}>
      <Header />

      <div className="content-grid">
        <ThemeCard />
        <div className="info-panel">
          <h2>Context checklist</h2>
          <ul>
            <li>No prop drilling for global theme state</li>
            <li>Typed custom hook for consumers</li>
            <li>Guard against usage outside provider</li>
          </ul>
          <ThemePreviewBadge />
        </div>
      </div>
    </section>
  );
}

export function App(): ReactElement {
  return (
    <main className="app-shell">
      <ThemeProvider>
        <ThemeWorkspace />
      </ThemeProvider>
    </main>
  );
}
