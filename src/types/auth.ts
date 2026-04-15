export type Role = 'admin' | 'editor' | 'viewer';

export interface User {
  name: string;
  role: Role;
}

export interface AuthContextType {
  user: User | null;
  login: (name: string, role: Role) => void;
  logout: () => void;
}
