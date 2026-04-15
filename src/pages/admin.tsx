import type { ReactElement } from 'react';

export function AdminPage(): ReactElement {
  return (
    <div className="page">
      <h1>Admin Panel</h1>
      <p>This page is only visible to administrators.</p>
    </div>
  );
}
