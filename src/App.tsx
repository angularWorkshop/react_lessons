import { useEffect, useMemo, useState, type ChangeEvent, type ReactElement } from 'react';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { AuthProvider, ThemeProvider, useAuth, useTheme } from './contexts';
import { ErrorBoundary } from './error-boundary';
import {
  fetchUsers,
  type UpdateUserInput,
  updateUser,
  type UserRecord,
  resetUsersStore,
} from './lib/fake-api';

interface EditUserFormValues {
  name: string;
  role: UserRecord['role'];
  status: UserRecord['status'];
}

const queryClient = new QueryClient();

function DashboardShell(): ReactElement {
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'role' | 'status'>('name');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [shouldCrashUsers, setShouldCrashUsers] = useState(false);

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

  const systemHealth = useMemo(
    () => [
      { label: 'Theme', value: theme },
      { label: 'Auth', value: user ? `Signed in as ${user.name}` : 'Guest mode' },
      { label: 'Query', value: usersQuery.isLoading ? 'Loading users...' : `${usersQuery.data?.total ?? 0} users tracked` },
    ],
    [theme, user, usersQuery.data?.total, usersQuery.isLoading],
  );

  const form = useForm<EditUserFormValues>({
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

  if (shouldCrashUsers) {
    throw new Error('Users section crashed intentionally');
  }

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
        <section className="panel">
          <p className="eyebrow">Access</p>
          <h2>Protected workspace</h2>
          <p>{user ? `Welcome, ${user.name}` : 'Guests can still see the dashboard in the starter branch.'}</p>
        </section>

        <ErrorBoundary title="System health">
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
        </ErrorBoundary>

        <ErrorBoundary title="Users section">
          <section className="panel panel--wide">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Users</p>
                <h2>User administration</h2>
              </div>
              <button type="button" onClick={() => setShouldCrashUsers(true)}>
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
                  <option value="name">Name</option>
                  <option value="role">Role</option>
                  <option value="status">Status</option>
                </select>
              </label>
            </div>

            {usersQuery.isLoading ? <p>Loading users...</p> : null}

            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Email</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {visibleUsers.map((userRecord) => (
                  <tr key={userRecord.id}>
                    <td>{userRecord.name}</td>
                    <td>{userRecord.role}</td>
                    <td>{userRecord.status}</td>
                    <td>{userRecord.email}</td>
                    <td>
                      <button type="button" onClick={() => setSelectedUser(userRecord)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button type="button" onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}>
                Previous page
              </button>
              <span>
                Page {usersQuery.data?.page ?? page} of {usersQuery.data?.totalPages ?? 1}
              </span>
              <button
                type="button"
                onClick={() =>
                  setPage((currentPage) =>
                    Math.min(usersQuery.data?.totalPages ?? currentPage, currentPage + 1),
                  )
                }
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
        </ErrorBoundary>
      </main>
    </div>
  );
}

export function App(): ReactElement {
  useEffect(() => {
    resetUsersStore();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <DashboardShell />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
