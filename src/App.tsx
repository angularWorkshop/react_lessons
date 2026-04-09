import { createContext, useContext, useMemo, useState, type ReactElement, type ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'editor';
}

interface AuthStateValue {
  user: User | null;
}

interface AuthActionsValue {
  login: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface RequireAuthProps {
  children: ReactNode;
}

const DEMO_USER: User = {
  id: 'u-1',
  name: 'Max',
  role: 'admin',
};

const AuthStateContext = createContext<AuthStateValue | undefined>(undefined);
const AuthActionsContext = createContext<AuthActionsValue | undefined>(undefined);

function useAuthState(): AuthStateValue {
  const context = useContext(AuthStateContext);

  if (!context) {
    throw new Error('useAuthState must be used within AuthProvider');
  }

  return context;
}

function useAuthActions(): AuthActionsValue {
  const context = useContext(AuthActionsContext);

  if (!context) {
    throw new Error('useAuthActions must be used within AuthProvider');
  }

  return context;
}

function AuthProvider({ children }: AuthProviderProps): ReactElement {
  const [user, setUser] = useState<User | null>(null);

  const stateValue = useMemo<AuthStateValue>(
    () => ({
      user,
    }),
    [user],
  );

  const actionsValue = useMemo<AuthActionsValue>(
    () => ({
      login: () => setUser(DEMO_USER),
      logout: () => setUser(null),
    }),
    [],
  );

  return (
    <AuthStateContext.Provider value={stateValue}>
      <AuthActionsContext.Provider value={actionsValue}>{children}</AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  );
}

function AuthToolbar(): ReactElement {
  const { user } = useAuthState();
  const { login, logout } = useAuthActions();

  return (
    <header className="auth-toolbar">
      <div>
        <p className="eyebrow">Topic 14.2</p>
        <h1>Auth context workspace</h1>
      </div>

      {user ? (
        <button type="button" className="auth-button auth-button--secondary" onClick={logout}>
          Sign out
        </button>
      ) : (
        <button type="button" className="auth-button" onClick={login}>
          Sign in
        </button>
      )}
    </header>
  );
}

function RequireAuth({ children }: RequireAuthProps): ReactElement {
  const { user } = useAuthState();

  if (!user) {
    return <section className="redirect-panel">Redirected to /login</section>;
  }

  return <>{children}</>;
}

function AuthStatusPanel(): ReactElement {
  const { user } = useAuthState();

  return (
    <section className="status-panel">
      <h2>Auth status</h2>
      <p>{user ? `Signed in as ${user.name}` : 'Guest session'}</p>
    </section>
  );
}

function PrivateDashboard(): ReactElement {
  const { user } = useAuthState();

  return (
    <section className="dashboard-panel">
      <p className="card-label">Protected area</p>
      <h2>Private dashboard</h2>
      <p>Current role: {user?.role ?? 'guest'}</p>
      <p className="description">
        Guests should be redirected before this content becomes visible.
      </p>
    </section>
  );
}

function AuthWorkspace(): ReactElement {
  return (
    <section className="auth-shell">
      <AuthToolbar />

      <div className="auth-grid">
        <AuthStatusPanel />
        <RequireAuth>
          <PrivateDashboard />
        </RequireAuth>
      </div>
    </section>
  );
}

export function App(): ReactElement {
  return (
    <main className="app-shell">
      <AuthProvider>
        <AuthWorkspace />
      </AuthProvider>
    </main>
  );
}
