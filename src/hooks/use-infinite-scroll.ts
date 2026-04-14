import { useCallback, useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollOptions<T> {
  fetchPage: (page: number) => Promise<T[]>;
  pageSize: number;
}

interface UseInfiniteScrollResult<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  sentinelRef: (node: HTMLElement | null) => void;
  reset: () => void;
}

export function useInfiniteScroll<T>({
  fetchPage,
  pageSize,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollResult<T> {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadNext = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPage(page);
      setItems((prev) => [...prev, ...data]);
      setHasMore(data.length >= pageSize);
      setPage((p) => p + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [fetchPage, page, pageSize, loading, hasMore]);

  const sentinelRef = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (!node) return;

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
          loadNext();
        }
      });
      observerRef.current.observe(node);
    },
    [loadNext],
  );

  const reset = useCallback(() => {
    setItems([]);
    setPage(0);
    setLoading(false);
    setError(null);
    setHasMore(true);
  }, []);

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return { items, loading, error, hasMore, sentinelRef, reset };
}
