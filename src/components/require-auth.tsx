import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth-store';

interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  // TODO: if user is null, return <Navigate to="/login" state={{ from: location.pathname }} replace />
  // Otherwise, render children

  return <>{children}</>;
}
