import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { act, renderHook, waitFor } from '@testing-library/react';

import { useLocalStorage } from '../../src/hooks/use-local-storage';
import { useInfiniteScroll } from '../../src/hooks/use-infinite-scroll';

// ─── IntersectionObserver mock ─────────────────────────────

let observerCallback: IntersectionObserverCallback;

const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

beforeAll(() => {
  globalThis.IntersectionObserver = vi.fn((callback: IntersectionObserverCallback) => {
    observerCallback = callback;
    return {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
      root: null,
      rootMargin: '',
      thresholds: [],
      takeRecords: () => [],
    };
  }) as unknown as typeof IntersectionObserver;
});

afterEach(() => {
  mockObserve.mockClear();
  mockUnobserve.mockClear();
  mockDisconnect.mockClear();
});

// ─── useLocalStorage tests ─────────────────────────────────

beforeEach(() => {
  localStorage.clear();
});

describe('useLocalStorage', () => {
  it('returns the initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('reads an existing value from localStorage', () => {
    localStorage.setItem('key', JSON.stringify('saved'));
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    expect(result.current[0]).toBe('saved');
  });

  it('updates value and syncs to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'init'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(JSON.parse(localStorage.getItem('key')!)).toBe('updated');
  });

  it('supports updater function in setValue', () => {
    const { result } = renderHook(() => useLocalStorage('counter', 1));

    act(() => {
      result.current[1]((prev) => prev + 10);
    });

    expect(result.current[0]).toBe(11);
  });

  it('removes value from localStorage on removeValue', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'init'));

    act(() => {
      result.current[1]('something');
    });

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBe('init');
    expect(localStorage.getItem('key')).toBeNull();
  });
});

// ─── useInfiniteScroll tests ───────────────────────────────

describe('useInfiniteScroll', () => {
  it('starts with empty items and hasMore true', () => {
    const fetchPage = vi.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll({ fetchPage, pageSize: 10 }),
    );

    expect(result.current.items).toEqual([]);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it('loads items when the sentinel is observed', async () => {
    const fetchPage = vi.fn().mockResolvedValue(['a', 'b', 'c']);
    const { result } = renderHook(() =>
      useInfiniteScroll({ fetchPage, pageSize: 3 }),
    );

    const sentinel = document.createElement('div');
    act(() => {
      result.current.sentinelRef(sentinel);
    });

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    await waitFor(() => {
      expect(result.current.items).toEqual(['a', 'b', 'c']);
    });
  });

  it('sets hasMore to false when page returns fewer items than pageSize', async () => {
    const fetchPage = vi.fn().mockResolvedValue(['only-one']);
    const { result } = renderHook(() =>
      useInfiniteScroll({ fetchPage, pageSize: 10 }),
    );

    const sentinel = document.createElement('div');
    act(() => {
      result.current.sentinelRef(sentinel);
    });

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    await waitFor(() => {
      expect(result.current.hasMore).toBe(false);
    });
  });

  it('resets state when reset() is called', async () => {
    const fetchPage = vi.fn().mockResolvedValue(['a', 'b']);
    const { result } = renderHook(() =>
      useInfiniteScroll({ fetchPage, pageSize: 2 }),
    );

    const sentinel = document.createElement('div');
    act(() => {
      result.current.sentinelRef(sentinel);
    });

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    await waitFor(() => {
      expect(result.current.items.length).toBeGreaterThan(0);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.hasMore).toBe(true);
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
