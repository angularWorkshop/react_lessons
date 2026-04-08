import type { CSSProperties, ReactElement } from 'react';

export function ProfileCard(): ReactElement {
  const profile = {
    avatarSrc:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
    avatarAlt: 'Ada Lovelace avatar',
    name: 'Ada Lovelace',
    role: 'Frontend engineer',
  };
  const isOnline = true;
  const statusLabel = isOnline ? 'online' : 'offline';
  const statusColor = isOnline ? '#16a34a' : '#64748b';
  const statusStyle: CSSProperties = {
    color: statusColor,
    fontWeight: 700,
  };

  return (
    <article className="profile-card">
      <img
        className="profile-card__avatar"
        src={profile.avatarSrc}
        alt={profile.avatarAlt}
      />

      <div className="profile-card__body">
        <p className="profile-card__eyebrow">Profile card</p>
        <h2>{profile.name}</h2>
        <p className="profile-card__role">{profile.role}</p>
        <p className="profile-card__status" style={statusStyle}>
          {statusLabel}
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
