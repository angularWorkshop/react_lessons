export interface User {
  id: number;
  name: string;
  role: string;
}

export const USERS: User[] = [
  { id: 1, name: 'Alice Chen', role: 'Frontend Engineer' },
  { id: 2, name: 'Bob Markov', role: 'Product Designer' },
  { id: 3, name: 'Clara Ruiz', role: 'Tech Lead' },
  { id: 4, name: 'Dan Okafor', role: 'Backend Engineer' },
];
