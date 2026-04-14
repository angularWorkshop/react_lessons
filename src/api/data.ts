export interface User {
  id: number;
  name: string;
  role: string;
}

export interface Stats {
  totalUsers: number;
  activeToday: number;
  avgSessionMin: number;
}

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, ms, value));
}

const USERS: User[] = [
  { id: 1, name: 'Alice Martin', role: 'Engineer' },
  { id: 2, name: 'Bob Chen', role: 'Designer' },
  { id: 3, name: 'Carol Davis', role: 'PM' },
];

const STATS: Stats = {
  totalUsers: 128,
  activeToday: 43,
  avgSessionMin: 24,
};

export function fetchUsers(): Promise<User[]> {
  return delay(1200, USERS);
}

export function fetchStats(): Promise<Stats> {
  return delay(800, STATS);
}
