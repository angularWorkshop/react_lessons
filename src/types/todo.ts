export type Priority = 'low' | 'medium' | 'high';

export type Filter = 'all' | 'active' | 'completed';

export type SortField = 'priority' | 'createdAt';

export type SortDirection = 'asc' | 'desc';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
}
