import type { ReactElement, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../context/auth-context';

interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps): ReactElement {
  const { user } = useAuth();
  const location = useLocation();

  // TODO: If user is not authenticated, redirect to /login
  // Include the current path as a `from` query parameter so the user
  // can be sent back after logging in.
  // Hint: use <Navigate to={...} replace /> and encodeURIComponent.

  return <>{children}</>;
}
