import type { Todo } from '../types/todo';

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;

  return (
    <div className="todo-stats">
      <div className="todo-stats__item">
        Total: <span className="todo-stats__value">{total}</span>
      </div>
      <div className="todo-stats__item">
        Active: <span className="todo-stats__value">{active}</span>
      </div>
      <div className="todo-stats__item">
        Completed: <span className="todo-stats__value">{completed}</span>
      </div>
    </div>
  );
}
