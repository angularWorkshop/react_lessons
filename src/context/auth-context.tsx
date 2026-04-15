import {
  createContext,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';

import type { AuthContextType, Role, User } from '../types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): ReactElement {
  const [user, setUser] = useState<User | null>(null);

  function login(name: string, role: Role): void {
    setUser({ name, role });
  }

  function logout(): void {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }

  return ctx;
}
