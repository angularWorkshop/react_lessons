import { useMemo, useState } from 'react';

import type { User } from '../../../entities/user';

export function useUserSearch(users: User[]) {
  const [query, setQuery] = useState('');

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return users;
    }

    return users.filter((user) => [user.name, user.role, user.status].some((value) => value.toLowerCase().includes(normalizedQuery)));
  }, [query, users]);

  return {
    query,
    setQuery,
    filteredUsers,
  };
}
