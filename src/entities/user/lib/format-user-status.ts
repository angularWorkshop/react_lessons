import type { User } from '../model/types';

export function formatUserStatus(status: User['status']): string {
  if (status === 'active') {
    return 'Active';
  }

  if (status === 'invited') {
    return 'Invited';
  }

  return 'Suspended';
}
