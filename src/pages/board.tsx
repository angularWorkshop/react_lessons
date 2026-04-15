import { useMemo, useState } from 'react';
import { useTaskStore } from '../store/task-store';
import { TaskCard } from '../components/task-card';
import type { TaskStatus } from '../types/task';

const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: 'todo', label: 'To Do' },
  { status: 'in-progress', label: 'In Progress' },
  { status: 'done', label: 'Done' },
];

export default function BoardPage() {
  const tasks = useTaskStore((s) => s.tasks);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return tasks;
    const q = search.toLowerCase();
    return tasks.filter(
      (t) => t.title.toLowerCase().includes(q) || t.assignee.toLowerCase().includes(q),
    );
  }, [tasks, search]);

  return (
    <div className="board">
      <div className="board__toolbar">
        <h1>Task Board</h1>
        <input
          className="board__search"
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search tasks"
        />
      </div>

      <div className="board__columns">
        {COLUMNS.map(({ status, label }) => {
          const columnTasks = filtered.filter((t) => t.status === status);
          return (
            <div key={status} className="board__column">
              <h2 className="board__column-title">
                {label} <span className="board__count">{columnTasks.length}</span>
              </h2>
              {columnTasks.length === 0 ? (
                <p className="board__empty">No tasks</p>
              ) : (
                columnTasks.map((task) => <TaskCard key={task.id} task={task} />)
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
