// TODO: define Priority as a union of 'low' | 'medium' | 'high'
export type Priority = string;

// TODO: define Filter as a union of 'all' | 'active' | 'completed'
export type Filter = string;

export type SortField = 'priority' | 'createdAt';

export type SortDirection = 'asc' | 'desc';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
}
