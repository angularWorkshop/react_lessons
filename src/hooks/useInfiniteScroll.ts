import { useEffect, useRef, useState } from 'react';

export interface InfiniteScrollResult<T> {
  items: T[];
  loading: boolean;
  hasMore: boolean;
  error: string | null;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

export interface InfiniteScrollPage<T> {
  items: T[];
  hasMore: boolean;
}

export type InfiniteScrollFetcher<T> = (page: number) => Promise<InfiniteScrollPage<T>>;

export function useInfiniteScroll<T>(fetcher: InfiniteScrollFetcher<T>): InfiniteScrollResult<T> {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void fetcher(1)
      .then((page) => {
        if (cancelled) {
          return;
        }

        setItems(page.items);
        setHasMore(page.hasMore);
      })
      .catch((reason: unknown) => {
        if (cancelled) {
          return;
        }

        setError(reason instanceof Error ? reason.message : 'Unknown error');
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fetcher]);

  return {
    items,
    loading,
    hasMore,
    error,
    sentinelRef,
  };
}
