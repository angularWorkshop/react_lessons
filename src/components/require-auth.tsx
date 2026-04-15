import type { ReactElement, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../context/auth-context';

interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps): ReactElement {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/login?from=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return <>{children}</>;
}
