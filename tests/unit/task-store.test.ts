import { describe, it, expect, beforeEach } from 'vitest';
import { useTaskStore } from '../../src/store/task-store';

describe('TaskStore', () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [] });
    localStorage.clear();
  });

  it('starts with empty tasks', () => {
    expect(useTaskStore.getState().tasks).toEqual([]);
  });

  it('adds a task', () => {
    useTaskStore.getState().addTask({
      title: 'Test task',
      description: 'Description',
      priority: 'high',
      assignee: 'Alice',
    });

    const tasks = useTaskStore.getState().tasks;
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Test task');
    expect(tasks[0].status).toBe('todo');
    expect(tasks[0].priority).toBe('high');
    expect(tasks[0].assignee).toBe('Alice');
  });

  it('updates task status', () => {
    useTaskStore.getState().addTask({
      title: 'Task',
      description: 'Desc',
      priority: 'medium',
      assignee: 'Bob',
    });

    const id = useTaskStore.getState().tasks[0].id;
    useTaskStore.getState().updateStatus(id, 'in-progress');

    expect(useTaskStore.getState().tasks[0].status).toBe('in-progress');
  });

  it('deletes a task', () => {
    useTaskStore.getState().addTask({
      title: 'Task to delete',
      description: 'Desc',
      priority: 'low',
      assignee: 'Carol',
    });

    const id = useTaskStore.getState().tasks[0].id;
    useTaskStore.getState().deleteTask(id);

    expect(useTaskStore.getState().tasks).toHaveLength(0);
  });

  it('preserves other tasks when deleting', () => {
    const store = useTaskStore.getState();
    store.addTask({ title: 'Task 1', description: 'D1', priority: 'low', assignee: 'A' });
    store.addTask({ title: 'Task 2', description: 'D2', priority: 'high', assignee: 'B' });

    const tasks = useTaskStore.getState().tasks;
    expect(tasks).toHaveLength(2);

    useTaskStore.getState().deleteTask(tasks[0].id);
    expect(useTaskStore.getState().tasks).toHaveLength(1);
    expect(useTaskStore.getState().tasks[0].title).toBe('Task 1');
  });
});
