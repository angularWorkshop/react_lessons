import type { ReactElement } from 'react';

import { type InfiniteScrollPage, useInfiniteScroll } from './hooks/useInfiniteScroll';

interface FeedItem {
  id: string;
  label: string;
}

async function fetchTimelinePage(page: number): Promise<InfiniteScrollPage<FeedItem>> {
  await new Promise((resolve) => {
    setTimeout(resolve, 20);
  });

  if (page === 1) {
    return {
      items: [
        { id: 'feed-1', label: 'Team A shipped the dashboard header' },
        { id: 'feed-2', label: 'Team B stabilized analytics cards' },
      ],
      hasMore: true,
    };
  }

  return {
    items: [
      { id: 'feed-3', label: 'Team C improved lazy route transitions' },
      { id: 'feed-4', label: 'Team D published the design tokens package' },
    ],
    hasMore: false,
  };
}

export function App(): ReactElement {
  const { items, loading, hasMore, error, sentinelRef } = useInfiniteScroll(fetchTimelinePage);

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Topic 22.2</p>
        <h1>Infinite scroll workspace</h1>
        <p>Build a generic hook that loads the next page when the sentinel becomes visible.</p>
      </section>

      <section className="feed-card">
        <h2>Release feed</h2>
        {error ? <p role="alert">{error}</p> : null}
        {loading ? <p>Loading first page...</p> : null}
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
        <p>{hasMore ? 'More pages available' : 'All pages loaded'}</p>
        <div ref={sentinelRef} data-testid="timeline-sentinel" />
      </section>
    </main>
  );
}
