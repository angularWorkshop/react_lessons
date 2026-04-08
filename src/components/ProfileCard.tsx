import type { ReactElement } from 'react';

export function ProfileCard(): ReactElement {
  const statusStyle = {
    color: '#16a34a',
    fontWeight: 700,
  };

  return (
    <article className="profile-card">
      <img
        className="profile-card__avatar"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80"
        alt="Ada Lovelace avatar"
      />

      <div className="profile-card__body">
        <p className="profile-card__eyebrow">Profile card</p>
        <h2>Ada Lovelace</h2>
        <p className="profile-card__role">Frontend engineer</p>
        <p className="profile-card__status" style={statusStyle}>
          online
        </p>

        <label className="profile-card__label" htmlFor="status-note">
          Status note
        </label>
        <input
          id="status-note"
          className="profile-card__input"
          defaultValue="Ready to review JSX output."
        />
      </div>
    </article>
  );
}
