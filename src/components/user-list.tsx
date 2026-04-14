import { use, type ReactElement } from 'react';

import type { User } from '../api/data';

interface UserListProps {
  usersPromise: Promise<User[]>;
}

export function UserList({ usersPromise }: UserListProps): ReactElement {
  const users = use(usersPromise);

  return (
    <section className="panel">
      <h2>Team members</h2>
      <ul className="user-list">
        {users.map((u) => (
          <li key={u.id} className="user-list__item">
            <span className="user-list__name">{u.name}</span>
            <span className="user-list__role">{u.role}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
