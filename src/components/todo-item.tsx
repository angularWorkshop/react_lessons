import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const titleClass = todo.completed
    ? 'todo-item__title todo-item__title--completed'
    : 'todo-item__title';

  return (
    <div className="todo-item">
      <input
        className="todo-item__checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Toggle "${todo.title}"`}
      />
      <span className={titleClass}>{todo.title}</span>
      <span className={`todo-item__priority todo-item__priority--${todo.priority}`}>
        {todo.priority}
      </span>
      <button
        className="todo-item__delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.title}"`}
      >
        Delete
      </button>
    </div>
  );
}
