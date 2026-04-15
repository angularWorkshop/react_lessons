import { useState, useEffect } from 'react';
import type { Todo, Filter, Priority, SortField, SortDirection } from './types/todo';
import { TodoForm } from './components/todo-form';
import { TodoList } from './components/todo-list';
import { FilterBar } from './components/filter-bar';
import { SortControls } from './components/sort-controls';
import { TodoStats } from './components/todo-stats';

const STORAGE_KEY = 'capstone-todos';

function loadTodos(): Todo[] {
  // TODO: read STORAGE_KEY from localStorage, parse JSON, return array of Todo
  // Handle cases: key missing, invalid JSON, non-array value
  return [];
}

const PRIORITY_ORDER: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

function sortTodos(todos: Todo[], _field: SortField, _direction: SortDirection): Todo[] {
  // TODO: sort a copy of the array by the given field and direction
  // For 'priority': use PRIORITY_ORDER to compare
  // For 'createdAt': compare timestamps
  // Return ascending or descending based on direction
  return [...todos];
}

function filterTodos(todos: Todo[], _filter: Filter): Todo[] {
  // TODO: return only active todos when filter is 'active'
  // return only completed todos when filter is 'completed'
  // return all todos when filter is 'all'
  return todos;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<Filter>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // TODO: add useEffect to save todos to localStorage whenever they change
  // Use STORAGE_KEY as the key and JSON.stringify to serialize

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

  const toggleTodo = (_id: string) => {
    // TODO: toggle the completed field of the todo with the given id
    // Use immutable update: map over todos and flip completed for the matching id
  };

  const deleteTodo = (_id: string) => {
    // TODO: remove the todo with the given id
    // Use immutable update: filter out the matching id
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
