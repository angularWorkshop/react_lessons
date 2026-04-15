import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../../src/App';

describe('Todo App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('Todo App')).toBeInTheDocument();
  });

  it('shows empty state when no todos', () => {
    render(<App />);
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });

  it('adds a new todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, 'Buy groceries');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.queryByText(/no todos yet/i)).not.toBeInTheDocument();
  });

  it('clears input after adding a todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, 'Buy groceries');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(input).toHaveValue('');
  });

  it('does not add empty todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, '   ');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });

  it('toggles a todo between active and completed', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, 'Walk the dog');
    await user.click(screen.getByRole('button', { name: /add/i }));

    const checkbox = screen.getByRole('checkbox', { name: /toggle "walk the dog"/i });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, 'Read a book');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('Read a book')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /delete "read a book"/i }));
    expect(screen.queryByText('Read a book')).not.toBeInTheDocument();
  });

  it('displays correct stats', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);

    await user.type(input, 'Task 1');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await user.type(input, 'Task 2');
    await user.click(screen.getByRole('button', { name: /add/i }));

    // Stats: Total 2, Active 2, Completed 0
    const stats = document.querySelector('.todo-stats')!;
    const values = () =>
      Array.from(stats.querySelectorAll('.todo-stats__value')).map((el) => el.textContent);

    expect(values()).toEqual(['2', '2', '0']);

    // Complete one task
    await user.click(screen.getByRole('checkbox', { name: /toggle "task 1"/i }));

    // Stats: Total 2, Active 1, Completed 1
    expect(values()).toEqual(['2', '1', '1']);
  });

  it('filters todos by active', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);

    await user.type(input, 'Active task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await user.type(input, 'Done task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await user.click(screen.getByRole('checkbox', { name: /toggle "done task"/i }));

    // Filter to active
    await user.click(screen.getByRole('button', { name: 'Active' }));

    expect(screen.getByText('Active task')).toBeInTheDocument();
    expect(screen.queryByText('Done task')).not.toBeInTheDocument();
  });

  it('filters todos by completed', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);

    await user.type(input, 'Active task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await user.type(input, 'Done task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await user.click(screen.getByRole('checkbox', { name: /toggle "done task"/i }));

    // Filter to completed
    await user.click(screen.getByRole('button', { name: 'Completed' }));

    expect(screen.queryByText('Active task')).not.toBeInTheDocument();
    expect(screen.getByText('Done task')).toBeInTheDocument();
  });

  it('persists todos to localStorage', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, 'Persistent task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    const stored = localStorage.getItem('capstone-todos');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].title).toBe('Persistent task');
  });

  it('loads todos from localStorage on mount', async () => {
    const todos = [
      {
        id: 'test-1',
        title: 'Saved task',
        completed: false,
        priority: 'high',
        createdAt: Date.now(),
      },
    ];
    localStorage.setItem('capstone-todos', JSON.stringify(todos));

    render(<App />);
    expect(screen.getByText('Saved task')).toBeInTheDocument();
  });

  it('shows priority badge on todo items', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const select = screen.getByRole('combobox');

    await user.selectOptions(select, 'high');
    await user.type(input, 'Urgent task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('high')).toBeInTheDocument();
  });

  it('sorts todos by priority', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const select = screen.getByRole('combobox');

    // Add low priority
    await user.selectOptions(select, 'low');
    await user.type(input, 'Low task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    // Add high priority
    await user.selectOptions(select, 'high');
    await user.type(input, 'High task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    // Sort by priority (default desc = low first), then toggle to asc (high first)
    await user.click(screen.getByRole('button', { name: /priority/i }));
    // Currently desc, toggle to asc
    await user.click(screen.getByRole('button', { name: /desc/i }));

    const items = screen.getAllByText(/task$/);
    expect(items[0].textContent).toBe('High task');
    expect(items[1].textContent).toBe('Low task');
  });
});
