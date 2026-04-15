import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, TaskStatus, TaskFormData } from '../types/task';

interface TaskState {
  tasks: Task[];
  addTask: (data: TaskFormData) => void;
  updateStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (data) =>
        set((state) => ({
          tasks: [
            {
              id: crypto.randomUUID(),
              ...data,
              status: 'todo' as const,
              createdAt: Date.now(),
            },
            ...state.tasks,
          ],
        })),

      updateStatus: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
    }),
    { name: 'task-board-storage' },
  ),
);
