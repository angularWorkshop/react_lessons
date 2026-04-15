import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  name: string;
  role: 'admin' | 'member';
}

interface AuthState {
  user: User | null;
  login: (name: string, role: User['role']) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (name, role) => set({ user: { name, role } }),
      logout: () => set({ user: null }),
    }),
    { name: 'task-board-auth' },
  ),
);
