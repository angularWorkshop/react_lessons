import { useEffect, useMemo, useState, type ChangeEvent, type PropsWithChildren, type ReactElement } from 'react';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { AuthProvider, ThemeProvider, useAuth, useTheme } from './contexts';
import { DataTable } from './data-table';
import { ErrorBoundary } from './error-boundary';
import {
  fetchUsers,
  type UpdateUserInput,
  updateUser,
  type UserRecord,
  resetUsersStore,
} from './lib/fake-api';

const editUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  role: z.enum(['Admin', 'Editor', 'Viewer']),
  status: z.enum(['active', 'invited', 'suspended']),
});

type EditUserFormValues = z.infer<typeof editUserSchema>;

function RequireAuth({ children }: PropsWithChildren): ReactElement {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="panel panel--wide">
        <p className="eyebrow">Protected area</p>
        <h2>Sign in to open the protected dashboard</h2>
        <p>Guests should not see the dashboard widgets until auth context grants access.</p>
      </section>
    );
  }

  return <>{children}</>;
}

function SystemHealthSection(): ReactElement {
  const { theme } = useTheme();
  const { user } = useAuth();
  const usersQuery = useQuery({
    queryKey: ['users-health'],
    queryFn: () =>
      fetchUsers({
        query: '',
        sortBy: 'name',
        page: 1,
        pageSize: 3,
      }),
  });

  const systemHealth = useMemo(
    () => [
      { label: 'Theme', value: theme },
      { label: 'Auth', value: user ? `Signed in as ${user.name}` : 'Guest mode' },
      { label: 'Query', value: usersQuery.isLoading ? 'Loading users...' : `${usersQuery.data?.total ?? 0} users tracked` },
    ],
    [theme, user, usersQuery.data?.total, usersQuery.isLoading],
  );

  return (
    <section className="panel">
      <p className="eyebrow">Overview</p>
      <h2>System health</h2>
      <ul className="status-list">
        {systemHealth.map((item) => (
          <li key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

interface UsersSectionProps {
  shouldCrash: boolean;
  onCrash: () => void;
}

function UsersSection({ shouldCrash, onCrash }: UsersSectionProps): ReactElement {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'role' | 'status'>('name');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);

  const usersQuery = useQuery({
    queryKey: ['users', searchQuery, sortBy, page],
    queryFn: () =>
      fetchUsers({
        query: searchQuery,
        sortBy,
        page,
        pageSize: 3,
      }),
  });

  useEffect(() => {
    setPage(1);
  }, [searchQuery, sortBy]);

  const visibleUsers = usersQuery.data?.items ?? [];
  const queryTools = useQueryClient();

  const saveUserMutation = useMutation({
    mutationFn: (input: UpdateUserInput) => updateUser(input),
    onSuccess: () => {
      void queryTools.invalidateQueries({ queryKey: ['users'] });
      setSelectedUser(null);
    },
  });

  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: '',
      role: 'Viewer',
      status: 'invited',
    },
  });

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    form.reset({
      name: selectedUser.name,
      role: selectedUser.role,
      status: selectedUser.status,
    });
  }, [form, selectedUser]);

  if (shouldCrash) {
    throw new Error('Users section crashed intentionally');
  }

  return (
    <section className="panel panel--wide">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Users</p>
          <h2>User administration</h2>
        </div>
        <button type="button" onClick={onCrash}>
          Crash users section
        </button>
      </div>

      <div className="toolbar">
        <label className="field">
          <span>Search</span>
          <input
            value={searchQuery}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value)}
            placeholder="Find by name or email"
          />
        </label>

        <label className="field">
          <span>Sort by</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value as 'name' | 'role' | 'status')}>
            <option value="name">name</option>
            <option value="role">role</option>
            <option value="status">status</option>
          </select>
        </label>
      </div>

      {usersQuery.isLoading ? <p>Loading users...</p> : null}

      <DataTable.Root aria-label="Users table">
        <DataTable.Header>
          <DataTable.Row>
            <DataTable.HeadCell>Name</DataTable.HeadCell>
            <DataTable.HeadCell>Role</DataTable.HeadCell>
            <DataTable.HeadCell>Status</DataTable.HeadCell>
            <DataTable.HeadCell>Email</DataTable.HeadCell>
            <DataTable.HeadCell />
          </DataTable.Row>
        </DataTable.Header>
        <DataTable.Body>
          {visibleUsers.map((userRecord) => (
            <DataTable.Row key={userRecord.id}>
              <DataTable.Cell>{userRecord.name}</DataTable.Cell>
              <DataTable.Cell>{userRecord.role}</DataTable.Cell>
              <DataTable.Cell>{userRecord.status}</DataTable.Cell>
              <DataTable.Cell>{userRecord.email}</DataTable.Cell>
              <DataTable.Cell>
                <button type="button" onClick={() => setSelectedUser(userRecord)}>
                  Edit
                </button>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable.Body>
      </DataTable.Root>

      <div className="pagination">
        <button type="button" onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}>
          Previous page
        </button>
        <span>
          Page {usersQuery.data?.page ?? page} of {usersQuery.data?.totalPages ?? 1}
        </span>
        <button
          type="button"
          onClick={() => setPage((currentPage) => currentPage + 1)}
        >
          Next page
        </button>
      </div>

      {selectedUser ? (
        <section className="editor" aria-label="Edit user drawer">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Editor</p>
              <h3>Edit {selectedUser.name}</h3>
            </div>
            <button type="button" onClick={() => setSelectedUser(null)}>
              Close
            </button>
          </div>

          <form
            className="editor-form"
            onSubmit={form.handleSubmit((values) => {
              void saveUserMutation.mutateAsync({
                id: selectedUser.id,
                name: values.name,
                role: values.role,
                status: values.status,
              });
            })}
          >
            <label className="field">
              <span>Name</span>
              <input aria-label="Name" {...form.register('name')} />
              {form.formState.errors.name ? (
                <span className="field-error">{form.formState.errors.name.message}</span>
              ) : null}
            </label>

            <label className="field">
              <span>Role</span>
              <select aria-label="Role" {...form.register('role')}>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </label>

            <label className="field">
              <span>Status</span>
              <select aria-label="Status" {...form.register('status')}>
                <option value="active">active</option>
                <option value="invited">invited</option>
                <option value="suspended">suspended</option>
              </select>
            </label>

            <button type="submit" disabled={saveUserMutation.isPending}>
              Save changes
            </button>
          </form>
        </section>
      ) : null}
    </section>
  );
}

function DashboardLayout(): ReactElement {
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useAuth();
  const [shouldCrashUsers, setShouldCrashUsers] = useState(false);

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Capstone 2</p>
          <h1>Dashboard control center</h1>
          <p className="hero-copy">
            Auth, async data, editing forms, compound tables, and section boundaries should work together in one SPA.
          </p>
        </div>
        <div className="hero-actions">
          <button type="button" onClick={toggleTheme}>
            Toggle theme: {theme}
          </button>
          {user ? (
            <button type="button" onClick={logout}>
              Sign out
            </button>
          ) : (
            <button type="button" onClick={login}>
              Sign in
            </button>
          )}
        </div>
      </header>

      <main className="dashboard-grid">
        <ErrorBoundary title="System health">
          <SystemHealthSection />
        </ErrorBoundary>

        <RequireAuth>
          {/* <ErrorBoundary title="Users section"> */}
          <ErrorBoundary title="Users section" onReset={() => setShouldCrashUsers(false)}>
            <UsersSection shouldCrash={shouldCrashUsers} onCrash={() => setShouldCrashUsers(true)} />
          </ErrorBoundary>
        </RequireAuth>
      </main>
    </div>
  );
}

export function App(): ReactElement {
  const [client] = useState(() => new QueryClient());

  useEffect(() => {
    resetUsersStore();
  }, []);

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <AuthProvider>
          <DashboardLayout />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
