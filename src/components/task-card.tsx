import { memo } from 'react';
import type { Task, TaskStatus } from '../types/task';
import { useTaskStore } from '../store/task-store';

interface TaskCardProps {
  task: Task;
}

const STATUS_OPTIONS: TaskStatus[] = ['todo', 'in-progress', 'done'];

const PRIORITY_COLORS: Record<string, string> = {
  high: '#dc2626',
  medium: '#d97706',
  low: '#16a34a',
};

export const TaskCard = memo(function TaskCard({ task }: TaskCardProps) {
  const updateStatus = useTaskStore((s) => s.updateStatus);
  const deleteTask = useTaskStore((s) => s.deleteTask);

  return (
    <div className="task-card">
      <div className="task-card__header">
        <h3 className="task-card__title">{task.title}</h3>
        <span
          className="task-card__priority"
          style={{ color: PRIORITY_COLORS[task.priority] }}
        >
          {task.priority}
        </span>
      </div>
      <p className="task-card__desc">{task.description}</p>
      <p className="task-card__assignee">Assignee: {task.assignee}</p>
      <div className="task-card__actions">
        <select
          value={task.status}
          onChange={(e) => updateStatus(task.id, e.target.value as TaskStatus)}
          aria-label={`Status for "${task.title}"`}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          className="btn-danger"
          onClick={() => deleteTask(task.id)}
          aria-label={`Delete "${task.title}"`}
        >
          Delete
        </button>
      </div>
    </div>
  );
});
