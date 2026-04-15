import type { ReactElement, ReactNode } from 'react';

import { useAuth } from '../context/auth-context';
import type { Role } from '../types/auth';

interface RequireRoleProps {
  role: Role;
  children: ReactNode;
}

export function RequireRole({ role, children }: RequireRoleProps): ReactElement {
  const { user } = useAuth();

  // TODO: Check if the user exists AND has the required role.
  // If not, render an Access Denied message inside a <div> with
  // className="access-denied" and role="alert".
  // Otherwise, render {children}.

  return <>{children}</>;
}
