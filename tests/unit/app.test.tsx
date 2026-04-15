import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from '../../src/store/auth-store';
import { useTaskStore } from '../../src/store/task-store';
import { RequireAuth } from '../../src/components/require-auth';
import { TaskCard } from '../../src/components/task-card';
import type { Task } from '../../src/types/task';
import { taskSchema } from '../../src/types/task';

describe('RequireAuth', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null });
  });

  it('redirects to /login when not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/board']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route
            path="/board"
            element={
              <RequireAuth>
                <div>Protected</div>
              </RequireAuth>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected')).not.toBeInTheDocument();
  });

  it('renders children when authenticated', () => {
    useAuthStore.setState({ user: { name: 'Test', role: 'member' } });

    render(
      <MemoryRouter initialEntries={['/board']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route
            path="/board"
            element={
              <RequireAuth>
                <div>Protected</div>
              </RequireAuth>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Protected')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});

describe('TaskCard', () => {
  const mockTask: Task = {
    id: 'test-1',
    title: 'Test Task',
    description: 'Test description',
    status: 'todo',
    priority: 'high',
    assignee: 'Alice',
    createdAt: Date.now(),
  };

  beforeEach(() => {
    useTaskStore.setState({ tasks: [{ ...mockTask }] });
  });

  it('renders task info', () => {
    render(
      <MemoryRouter>
        <TaskCard task={mockTask} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('high')).toBeInTheDocument();
    expect(screen.getByText('Assignee: Alice')).toBeInTheDocument();
  });

  it('changes task status via select', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <TaskCard task={mockTask} />
      </MemoryRouter>,
    );

    const select = screen.getByLabelText(/status for "test task"/i);
    await user.selectOptions(select, 'in-progress');

    expect(useTaskStore.getState().tasks[0].status).toBe('in-progress');
  });

  it('deletes a task', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <TaskCard task={mockTask} />
      </MemoryRouter>,
    );

    await user.click(screen.getByLabelText(/delete "test task"/i));
    expect(useTaskStore.getState().tasks).toHaveLength(0);
  });
});

describe('Zod taskSchema', () => {
  it('rejects short title', () => {
    const result = taskSchema.safeParse({
      title: 'ab',
      description: 'Valid desc',
      priority: 'high',
      assignee: 'Alice',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid priority', () => {
    const result = taskSchema.safeParse({
      title: 'Valid title',
      description: 'Valid desc',
      priority: 'critical',
      assignee: 'Alice',
    });
    expect(result.success).toBe(false);
  });

  it('rejects short assignee', () => {
    const result = taskSchema.safeParse({
      title: 'Valid title',
      description: 'Valid desc',
      priority: 'high',
      assignee: 'A',
    });
    expect(result.success).toBe(false);
  });

  it('accepts valid data', () => {
    const result = taskSchema.safeParse({
      title: 'Valid title',
      description: 'Valid description',
      priority: 'medium',
      assignee: 'Alice',
    });
    expect(result.success).toBe(true);
  });
});
