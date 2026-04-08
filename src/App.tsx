import type { ReactElement } from 'react';

import { ProfileCard } from './components/ProfileCard';

export function App(): ReactElement {
  return (
    <main className="app-shell">
      <div className="hero-card lesson-card">
        <p className="eyebrow">Topic 2.2</p>
        <h1>Dynamic JSX profile</h1>
        <p className="description">
          Render a profile card with values and styles computed in JavaScript.
        </p>

        <ProfileCard />
      </div>
    </main>
  );
}
