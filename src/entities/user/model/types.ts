export interface User {
  id: string;
  name: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'invited' | 'suspended';
}

export const users: User[] = [
  { id: 'user-1', name: 'Max Holden', role: 'Admin', status: 'active' },
  { id: 'user-2', name: 'Anna Stone', role: 'Editor', status: 'active' },
  { id: 'user-3', name: 'Leo Ford', role: 'Viewer', status: 'invited' },
  { id: 'user-4', name: 'Mia Ray', role: 'Editor', status: 'active' },
  { id: 'user-5', name: 'Noah Reed', role: 'Viewer', status: 'suspended' },
];
