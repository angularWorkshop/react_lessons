import type { ReactElement } from 'react';

import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Button } from './Button';
import { Card } from './Card';

const USER = {
  avatarSrc: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=80',
  avatarAlt: 'Jordan Lee avatar',
  team: 'Design systems',
  status: 'Active',
  name: 'Jordan Lee',
  role: 'UI engineer focused on reusable product primitives.',
};

export function UserCard(): ReactElement {
  return (
    <Card>
      <Avatar src={USER.avatarSrc} alt={USER.avatarAlt} />

      <div className="user-card__content">
        <div className="user-card__meta">
          <p className="user-card__label">{USER.team}</p>
          <Badge label={USER.status} tone="active" />
        </div>

        <h2>{USER.name}</h2>
        <p className="user-card__role">{USER.role}</p>

        <div className="user-card__actions">
          <Button label="Message" variant="primary" />
          <Button label="Follow" variant="secondary" />
        </div>
      </div>
    </Card>
  );
}
