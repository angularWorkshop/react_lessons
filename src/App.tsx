import type { ReactElement } from 'react';

export function App(): ReactElement {
  return (
    <main className="app-shell">
      <div className="hero-card user-card-shell">
        <p className="eyebrow">Topic 3.1</p>
        <h1>UI kit components</h1>
        <p className="description">
          Compose a profile page from small reusable building blocks.
        </p>

        <section className="user-card" aria-label="User card preview">
          <div className="avatar-frame">
            <img
              className="avatar-image"
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=80"
              alt="Jordan Lee avatar"
            />
          </div>

          <div className="user-card__content">
            <div className="user-card__meta">
              <p className="user-card__label">Design systems</p>
              <span className="badge badge--active">Active</span>
            </div>

            <h2>Jordan Lee</h2>
            <p className="user-card__role">UI engineer focused on reusable product primitives.</p>

            <div className="user-card__actions">
              <button className="button button--primary" type="button">
                Message
              </button>
              <button className="button button--secondary" type="button">
                Follow
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
