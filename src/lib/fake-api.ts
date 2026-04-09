export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'invited' | 'suspended';
}

export interface UserFilters {
  query: string;
  sortBy: 'name' | 'role' | 'status';
  page: number;
  pageSize: number;
}

export interface UsersResponse {
  items: UserRecord[];
  total: number;
  totalPages: number;
  page: number;
}

const initialUsers: UserRecord[] = [
  { id: 'u-1', name: 'Max Holden', email: 'max@edutec.dev', role: 'Admin', status: 'active' },
  { id: 'u-2', name: 'Anna Stone', email: 'anna@edutec.dev', role: 'Editor', status: 'active' },
  { id: 'u-3', name: 'Leo Ford', email: 'leo@edutec.dev', role: 'Viewer', status: 'invited' },
  { id: 'u-4', name: 'Mia Ray', email: 'mia@edutec.dev', role: 'Editor', status: 'active' },
  { id: 'u-5', name: 'Noah Reed', email: 'noah@edutec.dev', role: 'Viewer', status: 'suspended' },
  { id: 'u-6', name: 'Olivia Hart', email: 'olivia@edutec.dev', role: 'Admin', status: 'active' },
  { id: 'u-7', name: 'Ethan Cole', email: 'ethan@edutec.dev', role: 'Viewer', status: 'invited' },
  { id: 'u-8', name: 'Sofia Lane', email: 'sofia@edutec.dev', role: 'Editor', status: 'active' },
];

let usersStore = [...initialUsers];

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function resetUsersStore(): void {
  usersStore = [...initialUsers];
}

export async function fetchUsers(filters: UserFilters): Promise<UsersResponse> {
  await wait(30);

  const normalizedQuery = filters.query.trim().toLowerCase();
  const filtered = usersStore.filter((user) => {
    if (normalizedQuery.length === 0) {
      return true;
    }

    return [user.name, user.email, user.role, user.status].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    );
  });

  const sorted = [...filtered].sort((left, right) => {
    const leftValue = left[filters.sortBy].toLowerCase();
    const rightValue = right[filters.sortBy].toLowerCase();
    return leftValue.localeCompare(rightValue);
  });

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / filters.pageSize));
  const safePage = Math.min(filters.page, totalPages);
  const startIndex = (safePage - 1) * filters.pageSize;

  return {
    items: sorted.slice(startIndex, startIndex + filters.pageSize),
    total,
    totalPages,
    page: safePage,
  };
}

export interface UpdateUserInput {
  id: string;
  name: string;
  role: UserRecord['role'];
  status: UserRecord['status'];
}

export async function updateUser(input: UpdateUserInput): Promise<UserRecord> {
  await wait(20);

  const currentUser = usersStore.find((user) => user.id === input.id);
  if (!currentUser) {
    throw new Error(`User ${input.id} was not found`);
  }

  const nextUser: UserRecord = {
    ...currentUser,
    name: input.name,
    role: input.role,
    status: input.status,
  };

  usersStore = usersStore.map((user) => (user.id === input.id ? nextUser : user));
  return nextUser;
}
