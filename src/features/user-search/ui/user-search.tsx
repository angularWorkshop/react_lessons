import type { ChangeEvent, ReactElement } from 'react';

interface UserSearchProps {
  query: string;
  onChange: (nextQuery: string) => void;
}

export function UserSearch({ query, onChange }: UserSearchProps): ReactElement {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }

  return (
    <label className="search-field">
      <span>Search users</span>
      <input placeholder="Search by name, role, or status" value={query} onChange={handleChange} />
    </label>
  );
}
