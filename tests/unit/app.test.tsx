import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen, waitFor } from '@testing-library/react';
import type { ReactElement } from 'react';

import { App } from '../../src/App';
import { type InfiniteScrollPage, useInfiniteScroll } from '../../src/hooks/useInfiniteScroll';

class IntersectionObserverMock {
  public static instances: IntersectionObserverMock[] = [];

  public readonly observe = vi.fn();
  public readonly disconnect = vi.fn();

  public constructor(
    private readonly callback: IntersectionObserverCallback,
  ) {
    IntersectionObserverMock.instances.push(this);
  }

  public unobserve(): void {}

  public trigger(isIntersecting: boolean): void {
    this.callback(
      [
        {
          isIntersecting,
          target: document.createElement('div'),
        } as unknown as IntersectionObserverEntry,
      ],
      this as unknown as IntersectionObserver,
    );
  }
}

function installIntersectionObserver(): void {
  IntersectionObserverMock.instances = [];
  globalThis.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;
}

describe('Topic 22.2 runtime', () => {
  beforeEach(() => {
    installIntersectionObserver();
  });

  it('renders the infinite scroll workspace shell', async () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Infinite scroll workspace' })).toBeInTheDocument();
    expect(await screen.findByText('Team A shipped the dashboard header')).toBeInTheDocument();
  });

  it('loads the next page when the sentinel intersects', async () => {
    const fetcher = vi
      .fn<(page: number) => Promise<InfiniteScrollPage<string>>>()
      .mockResolvedValueOnce({ items: ['page-1-item', 'page-1-item-2'], hasMore: true })
      .mockResolvedValueOnce({ items: ['page-2-item', 'page-2-item-2'], hasMore: false });

    function Host(): ReactElement {
      const { items, hasMore, sentinelRef } = useInfiniteScroll<string>(fetcher);

      return (
        <div>
          <ul>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{hasMore ? 'More pages available' : 'All pages loaded'}</p>
          <div ref={sentinelRef} data-testid="sentinel" />
        </div>
      );
    }

    render(<Host />);

    expect(await screen.findByText('page-1-item')).toBeInTheDocument();
    expect(fetcher).toHaveBeenCalledTimes(1);

    IntersectionObserverMock.instances[0]?.trigger(true);

    expect(await screen.findByText('page-2-item')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('All pages loaded')).toBeInTheDocument();
    });
  });

  it('disconnects the observer on cleanup', async () => {
    const fetcher = vi.fn<(page: number) => Promise<InfiniteScrollPage<string>>>().mockResolvedValue({
      items: ['page-1-item'],
      hasMore: true,
    });

    function Host(): ReactElement {
      const { sentinelRef } = useInfiniteScroll<string>(fetcher);
      return <div ref={sentinelRef} data-testid="sentinel" />;
    }

    const view = render(<Host />);
    await waitFor(() => {
      expect(fetcher).toHaveBeenCalledTimes(1);
    });

    view.unmount();

    expect(IntersectionObserverMock.instances[0]?.disconnect).toHaveBeenCalled();
  });
});

describe('Topic 22.2 source checks', () => {
  const hookSource = readFileSync(resolve(process.cwd(), 'src/hooks/useInfiniteScroll.ts'), 'utf8');

  it('defines a generic infinite scroll hook', () => {
    expect(hookSource).toMatch(/useInfiniteScroll<T>\(fetcher: InfiniteScrollFetcher<T>\)/);
    expect(hookSource).toMatch(/items: T\[]/);
    expect(hookSource).toMatch(/sentinelRef/);
  });

  it('uses IntersectionObserver and cleanup logic', () => {
    expect(hookSource).toMatch(/new IntersectionObserver/);
    expect(hookSource).toMatch(/observer\.disconnect\(\)/);
  });
});
