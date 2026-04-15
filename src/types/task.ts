import { z } from 'zod';

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  createdAt: number;
}

export const taskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  priority: z.enum(['low', 'medium', 'high']),
  assignee: z.string().min(2, 'Assignee must be at least 2 characters'),
});

export type TaskFormData = z.infer<typeof taskSchema>;
