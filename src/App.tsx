import { useState, useEffect } from 'react';
import type { Todo, Filter, Priority, SortField, SortDirection } from './types/todo';
import { TodoForm } from './components/todo-form';
import { TodoList } from './components/todo-list';
import { FilterBar } from './components/filter-bar';
import { SortControls } from './components/sort-controls';
import { TodoStats } from './components/todo-stats';

const STORAGE_KEY = 'capstone-todos';

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Todo[];
  } catch {
    return [];
  }
}

const PRIORITY_ORDER: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

function sortTodos(todos: Todo[], field: SortField, direction: SortDirection): Todo[] {
  return [...todos].sort((a, b) => {
    let cmp: number;
    if (field === 'priority') {
      cmp = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    } else {
      cmp = a.createdAt - b.createdAt;
    }
    return direction === 'asc' ? cmp : -cmp;
  });
}

function filterTodos(todos: Todo[], filter: Filter): Todo[] {
  switch (filter) {
    case 'active':
      return todos.filter((t) => !t.completed);
    case 'completed':
      return todos.filter((t) => t.completed);
    default:
      return todos;
  }
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<Filter>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string, priority: Priority) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleDirection = () => {
    setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
  };

  const visible = sortTodos(filterTodos(todos, filter), sortField, sortDirection);

  return (
    <div className="app">
      <h1 className="app__title">Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <TodoStats todos={todos} />
      <FilterBar current={filter} onChange={setFilter} />
      <SortControls
        field={sortField}
        direction={sortDirection}
        onChangeField={setSortField}
        onToggleDirection={toggleDirection}
      />
      <TodoList todos={visible} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}
