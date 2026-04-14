import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { act, renderHook } from '@testing-library/react';

import { useLocalStorage } from '../../src/hooks/use-local-storage';
import { useInfiniteScroll } from '../../src/hooks/use-infinite-scroll';

// ─── IntersectionObserver mock ─────────────────────────────
// TODO: mock IntersectionObserver globally before all tests
// The mock should:
// - store the callback so tests can trigger it manually
// - implement observe(), unobserve(), disconnect() as vi.fn()
// - be assigned to globalThis.IntersectionObserver

// ─── useLocalStorage tests ─────────────────────────────────

beforeEach(() => {
  localStorage.clear();
});

describe('useLocalStorage', () => {
  it('returns the initial value when localStorage is empty', () => {
    // TODO: renderHook with useLocalStorage('key', 'default')
    // check that result.current[0] is 'default'
    expect('implement').toBe('this test');
  });

  it('reads an existing value from localStorage', () => {
    // TODO: set localStorage.setItem('key', JSON.stringify('saved'))
    // renderHook and check that result.current[0] is 'saved'
    expect('implement').toBe('this test');
  });

  it('updates value and syncs to localStorage', () => {
    // TODO: renderHook, call setValue inside act()
    // check that result.current[0] is updated
    // check that localStorage.getItem('key') has the new value
    expect('implement').toBe('this test');
  });

  it('supports updater function in setValue', () => {
    // TODO: renderHook with initial value 1
    // call setValue((prev) => prev + 10) inside act()
    // check that result.current[0] is 11
    expect('implement').toBe('this test');
  });

  it('removes value from localStorage on removeValue', () => {
    // TODO: renderHook, set a value, then call removeValue inside act()
    // check that result.current[0] is back to initialValue
    // check that localStorage.getItem('key') is null
    expect('implement').toBe('this test');
  });
});

// ─── useInfiniteScroll tests ───────────────────────────────

describe('useInfiniteScroll', () => {
  it('starts with empty items and hasMore true', () => {
    // TODO: renderHook with a mock fetchPage
    // check items is [], hasMore is true, loading is false
    expect('implement').toBe('this test');
  });

  it('loads items when the sentinel is observed', async () => {
    // TODO: renderHook, call sentinelRef with a DOM node
    // trigger the IntersectionObserver callback with isIntersecting: true
    // wait for loading to finish, check that items are populated
    expect('implement').toBe('this test');
  });

  it('sets hasMore to false when page returns fewer items than pageSize', async () => {
    // TODO: mock fetchPage to return fewer items than pageSize
    // trigger loading, check that hasMore becomes false
    expect('implement').toBe('this test');
  });

  it('resets state when reset() is called', async () => {
    // TODO: load some items, then call reset() inside act()
    // check that items is [], hasMore is true, page is back to 0
    expect('implement').toBe('this test');
  });
});

// ─── Source checks ─────────────────────────────────────────

describe('Topic 26.1 — test quality checks', () => {
  const testSource = readFileSync(resolve(process.cwd(), 'tests/unit/app.test.tsx'), 'utf8');

  it('uses renderHook for hook testing', () => {
    expect(testSource).toMatch(/renderHook\(\s*\(\)\s*=>/);
  });

  it('wraps state updates in act()', () => {
    const lines = testSource.split('\n');
    const codeLines = lines.filter((l) => !l.trimStart().startsWith('//'));
    const codeOnly = codeLines.join('\n');
    expect(codeOnly).toMatch(/act\(\s*\(\)\s*=>/);
  });

  it('mocks IntersectionObserver', () => {
    expect(testSource).toMatch(/IntersectionObserver/);
  });
});
