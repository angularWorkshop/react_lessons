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

      addTask: (_data) => {
        // TODO: create a new Task object with crypto.randomUUID(), status 'todo',
        // createdAt Date.now(), and spread _data fields.
        // Prepend it to state.tasks using set()
      },

      updateStatus: (_id, _status) => {
        // TODO: map over state.tasks, update the status of the task with matching id
      },

      deleteTask: (_id) => {
        // TODO: filter out the task with matching id from state.tasks
      },
    }),
    { name: 'task-board-storage' },
  ),
);
