import type { ReactElement } from 'react';

import { useAuth } from '../context/auth-context';

export function DashboardPage(): ReactElement {
  const { user } = useAuth();

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <p>Welcome back, <strong>{user?.name}</strong>!</p>
      <p>Your role: <strong>{user?.role}</strong></p>
    </div>
  );
}
