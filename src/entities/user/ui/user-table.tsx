import type { ReactElement } from 'react';

import { formatUserStatus } from '../lib/format-user-status';
import type { User } from '../model/types';

interface UserTableProps {
  users: User[];
}

export function UserTable({ users }: UserTableProps): ReactElement {
  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.role}</td>
            <td>{formatUserStatus(user.status)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
