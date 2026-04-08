import type { ReactElement } from 'react';

import { UserCard } from './components/UserCard';

export function App(): ReactElement {
  return (
    <main className="app-shell">
      <div className="hero-card user-card-shell">
        <p className="eyebrow">Topic 3.1</p>
        <h1>UI kit components</h1>
        <p className="description">
          Compose a profile page from small reusable building blocks.
        </p>

        <UserCard />
      </div>
    </main>
  );
}
