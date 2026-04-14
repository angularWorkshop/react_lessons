import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { act, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import type { ReactElement } from 'react';

import { App } from '../../src/App';
import { useClickOutside } from '../../src/hooks/useClickOutside';
import { useLocalStorage } from '../../src/hooks/useLocalStorage';
import { useMediaQuery } from '../../src/hooks/useMediaQuery';

class MatchMediaController {
  private readonly listeners = new Set<(event: MediaQueryListEvent) => void>();

  public constructor(
    public readonly media: string,
    public matches: boolean,
  ) {}

  public addEventListener(_type: 'change', listener: (event: MediaQueryListEvent) => void): void {
    this.listeners.add(listener);
  }

  public removeEventListener(_type: 'change', listener: (event: MediaQueryListEvent) => void): void {
    this.listeners.delete(listener);
  }

  public dispatch(nextMatches: boolean): void {
    this.matches = nextMatches;
    const event = { matches: nextMatches, media: this.media } as MediaQueryListEvent;
    this.listeners.forEach((listener) => listener(event));
  }
}

const mediaControllers = new Map<string, MatchMediaController>();

function installMatchMedia(): void {
  window.matchMedia = ((query: string) => {
    let controller = mediaControllers.get(query);

    if (!controller) {
      controller = new MatchMediaController(query, false);
      mediaControllers.set(query, controller);
    }

    return {
      matches: controller.matches,
      media: controller.media,
      onchange: null,
      addEventListener: controller.addEventListener.bind(controller),
      removeEventListener: controller.removeEventListener.bind(controller),
      addListener: (listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => unknown) | null) => {
        if (listener) {
          controller.addEventListener('change', listener);
        }
      },
      removeListener: (listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => unknown) | null) => {
        if (listener) {
          controller.removeEventListener('change', listener);
        }
      },
      dispatchEvent: () => true,
    } as unknown as MediaQueryList;
  }) as typeof window.matchMedia;
}

describe('Topic 22.1 runtime', () => {
  beforeEach(() => {
    localStorage.clear();
    mediaControllers.clear();
    installMatchMedia();
  });

  it('renders the hooks library workspace shell', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Hooks library workspace' })).toBeInTheDocument();
    expect(screen.getByText('Saved view: grid')).toBeInTheDocument();
  });

  it('syncs generic state with localStorage', async () => {
    const { result } = renderHook(() => useLocalStorage<'grid' | 'list'>('dashboard-view', 'grid'));

    expect(result.current[0]).toBe('grid');

    act(() => {
      result.current[1]('list');
    });

    expect(result.current[0]).toBe('list');
    await waitFor(() => {
      expect(localStorage.getItem('dashboard-view')).toBe(JSON.stringify('list'));
    });
  });

  it('tracks media query changes', async () => {
    const { result } = renderHook(() => useMediaQuery('(prefers-color-scheme: dark)'));

    expect(result.current).toBe(false);

    act(() => {
      mediaControllers.get('(prefers-color-scheme: dark)')?.dispatch(true);
    });

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('calls the handler only when clicking outside the referenced element', () => {
    const handler = vi.fn();

    function Host(): ReactElement {
      const ref = { current: null as HTMLDivElement | null };
      useClickOutside(ref, handler);

      return (
        <div>
          <div ref={(node) => {
            ref.current = node;
          }}>inside</div>
          <button type="button">outside</button>
        </div>
      );
    }

    render(<Host />);

    fireEvent.mouseDown(screen.getByText('inside'));
    expect(handler).not.toHaveBeenCalled();

    fireEvent.mouseDown(screen.getByRole('button', { name: 'outside' }));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

describe('Topic 22.1 source checks', () => {
  const localStorageSource = readFileSync(resolve(process.cwd(), 'src/hooks/useLocalStorage.ts'), 'utf8');
  const mediaQuerySource = readFileSync(resolve(process.cwd(), 'src/hooks/useMediaQuery.ts'), 'utf8');
  const clickOutsideSource = readFileSync(resolve(process.cwd(), 'src/hooks/useClickOutside.ts'), 'utf8');

  it('keeps hooks in dedicated files with typed APIs', () => {
    expect(localStorageSource).toMatch(/useLocalStorage<T>\(key: string, defaultValue: T\)/);
    expect(mediaQuerySource).toMatch(/useMediaQuery\(query: string\): boolean/);
    expect(clickOutsideSource).toMatch(/useClickOutside<T extends HTMLElement>/);
  });

  it('subscribes to browser APIs instead of using component-specific hacks', () => {
    expect(localStorageSource).toMatch(/localStorage/);
    expect(mediaQuerySource).toMatch(/matchMedia/);
    expect(clickOutsideSource).toMatch(/document\.addEventListener/);
  });
});
