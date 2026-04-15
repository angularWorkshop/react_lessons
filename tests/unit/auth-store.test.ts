import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../../src/store/auth-store';

describe('AuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null });
    localStorage.clear();
  });

  it('starts with no user', () => {
    expect(useAuthStore.getState().user).toBeNull();
  });

  it('logs in a user', () => {
    useAuthStore.getState().login('Alice', 'admin');
    const user = useAuthStore.getState().user;
    expect(user).toEqual({ name: 'Alice', role: 'admin' });
  });

  it('logs out a user', () => {
    useAuthStore.getState().login('Bob', 'member');
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().user).toBeNull();
  });
});
