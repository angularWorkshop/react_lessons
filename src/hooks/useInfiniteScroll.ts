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
  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPage(pageNumber: number): Promise<void> {
      if (loadingRef.current) {
        return;
      }

      loadingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const page = await fetcher(pageNumber);

        if (cancelled) {
          return;
        }

        pageRef.current = pageNumber;
        setItems((currentItems) => (pageNumber === 1 ? page.items : [...currentItems, ...page.items]));
        setHasMore(page.hasMore);
      } catch (reason: unknown) {
        if (cancelled) {
          return;
        }

        setError(reason instanceof Error ? reason.message : 'Unknown error');
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
        loadingRef.current = false;
      }
    }

    void loadPage(1);

    return () => {
      cancelled = true;
    };
  }, [fetcher]);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];

      if (!firstEntry?.isIntersecting || loadingRef.current || !hasMore) {
        return;
      }

      void fetcher(pageRef.current + 1)
        .then((page) => {
          setItems((currentItems) => [...currentItems, ...page.items]);
          setHasMore(page.hasMore);
          pageRef.current += 1;
        })
        .catch((reason: unknown) => {
          setError(reason instanceof Error ? reason.message : 'Unknown error');
        })
        .finally(() => {
          setLoading(false);
          loadingRef.current = false;
        });

      loadingRef.current = true;
      setLoading(true);
    });

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetcher, hasMore]);

  return {
    items,
    loading,
    hasMore,
    error,
    sentinelRef,
  };
}
