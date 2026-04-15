import type { ReactElement, ReactNode } from 'react';

import { useAuth } from '../context/auth-context';
import type { Role } from '../types/auth';

interface RequireRoleProps {
  role: Role;
  children: ReactNode;
}

export function RequireRole({ role, children }: RequireRoleProps): ReactElement {
  const { user } = useAuth();

  if (!user || user.role !== role) {
    return (
      <div className="access-denied" role="alert">
        <h2>Access Denied</h2>
        <p>You need the <strong>{role}</strong> role to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
}
