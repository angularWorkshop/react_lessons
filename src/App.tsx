import { useState, type FormEvent, type ReactElement } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

interface TodoItem {
  id: string;
  title: string;
}

const TODOS_QUERY_KEY = ['todos'];
const queryClient = new QueryClient();

let todoSequence = 3;
let todoStore: TodoItem[] = [
  { id: 'todo-1', title: 'Refactor hooks' },
  { id: 'todo-2', title: 'Ship type-safe forms' },
];

function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delay);
  });
}

async function fetchTodos(): Promise<TodoItem[]> {
  await wait(30);
  return [...todoStore];
}

async function createTodo(title: string): Promise<TodoItem> {
  await wait(60);

  if (title.toLowerCase().includes('fail')) {
    throw new Error('Server rejected the todo');
  }

  const nextTodo: TodoItem = {
    id: `todo-${todoSequence}`,
    title,
  };

  todoSequence += 1;
  todoStore = [...todoStore, nextTodo];

  return nextTodo;
}

async function deleteTodo(id: string): Promise<void> {
  await wait(40);
  todoStore = todoStore.filter((todo) => todo.id !== id);
}

function TodosWorkspace(): ReactElement {
  const queryClientApi = useQueryClient();
  const [draft, setDraft] = useState('');

  const todosQuery = useQuery({
    queryKey: TODOS_QUERY_KEY,
    queryFn: fetchTodos,
  });

  const addTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      setDraft('');
      void queryClientApi.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const trimmedTitle = draft.trim();

    if (!trimmedTitle) {
      return;
    }

    void addTodoMutation.mutateAsync(trimmedTitle);
  }

  return (
    <section className="query-shell">
      <p className="eyebrow">Topic 15.2</p>
      <h1>TanStack Query task board</h1>
      <p className="description">
        Move repeated fetch logic into TanStack Query and keep the task list in sync after mutations.
      </p>

      <form className="composer" onSubmit={handleSubmit}>
        <input
          aria-label="Todo title"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add a todo"
        />
        <button type="submit">Add todo</button>
      </form>

      <div className="status-card">
        <p>Loading: {todosQuery.isLoading ? 'yes' : 'no'}</p>
        <p>Error: {addTodoMutation.error instanceof Error ? addTodoMutation.error.message : 'none'}</p>
      </div>

      <ul className="todo-list">
        {(todosQuery.data ?? []).map((todo) => (
          <li key={todo.id} className="todo-item">
            <span>{todo.title}</span>
            <button type="button" onClick={() => deleteTodoMutation.mutate(todo.id)}>
              Delete {todo.title}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function App(): ReactElement {
  return (
    <main className="app-shell">
      <QueryClientProvider client={queryClient}>
        <TodosWorkspace />
      </QueryClientProvider>
    </main>
  );
}
