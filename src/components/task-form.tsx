import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, type TaskFormData } from '../types/task';
import { useTaskStore } from '../store/task-store';
import { useNavigate } from 'react-router-dom';

export function TaskForm() {
  const addTask = useTaskStore((s) => s.addTask);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    mode: 'onChange',
    defaultValues: { title: '', description: '', priority: 'medium', assignee: '' },
  });

  const onSubmit = (data: TaskFormData) => {
    addTask(data);
    navigate('/board');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="title">Title</label>
        <input id="title" {...register('title')} placeholder="Task title" />
        {errors.title && <span className="field-error">{errors.title.message}</span>}
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea id="description" {...register('description')} placeholder="Describe the task" />
        {errors.description && <span className="field-error">{errors.description.message}</span>}
      </div>

      <div className="field">
        <label htmlFor="priority">Priority</label>
        <select id="priority" {...register('priority')}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="assignee">Assignee</label>
        <input id="assignee" {...register('assignee')} placeholder="Who is responsible?" />
        {errors.assignee && <span className="field-error">{errors.assignee.message}</span>}
      </div>

      <button type="submit" className="btn-primary" disabled={!isValid}>
        Create Task
      </button>
    </form>
  );
}
