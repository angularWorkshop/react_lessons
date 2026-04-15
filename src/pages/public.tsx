import type { ReactElement } from 'react';

export function PublicPage(): ReactElement {
  return (
    <div className="page">
      <h1>Welcome</h1>
      <p>This is the public home page. Anyone can see it.</p>
    </div>
  );
}
