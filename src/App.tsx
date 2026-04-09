import { useEffect, useState, type ReactElement } from 'react';

interface UserProfile {
  id: string;
  name: string;
  role: string;
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const USER_FIXTURES: Record<string, { delay: number; value: UserProfile }> = {
  '/api/users/slow': {
    delay: 90,
    value: { id: 'slow', name: 'Ada Lovelace', role: 'Mathematician' },
  },
  '/api/users/fast': {
    delay: 20,
    value: { id: 'fast', name: 'Grace Hopper', role: 'Computer Scientist' },
  },
};

function fetchUserProfile(url: string, signal?: AbortSignal): Promise<UserProfile> {
  return new Promise<UserProfile>((resolve, reject) => {
    const fixture = USER_FIXTURES[url];

    if (!fixture) {
      reject(new Error(`Unknown URL: ${url}`));
      return;
    }

    const timeoutId = window.setTimeout(() => {
      resolve(fixture.value);
    }, fixture.delay);

    signal?.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeoutId);
        reject(new DOMException('The operation was aborted.', 'AbortError'));
      },
      { once: true },
    );
  });
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    async function load(): Promise<void> {
      try {
        const response = await fetchUserProfile(url, controller.signal);
        setData(response as T);
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === 'AbortError') {
          return;
        }

        const message = loadError instanceof Error ? loadError.message : 'Unknown error';
        setError(message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void load();

    return (): void => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}

export function App(): ReactElement {
  const [url, setUrl] = useState('/api/users/slow');
  const { data, loading, error } = useFetch<UserProfile>(url);

  return (
    <main className="app-shell">
      <section className="fetch-shell">
        <p className="eyebrow">Topic 15.1</p>
        <h1>useFetch with request races</h1>
        <p className="description">
          Prevent stale requests from overwriting newer data when the URL changes quickly.
        </p>

        <div className="control-row">
          <button type="button" className="action-button" onClick={() => setUrl('/api/users/slow')}>
            Load slow profile
          </button>
          <button type="button" className="action-button action-button--secondary" onClick={() => setUrl('/api/users/fast')}>
            Load fast profile
          </button>
        </div>

        <div className="status-grid">
          <article className="status-card">
            <p className="card-label">Request state</p>
            <p>URL: {url}</p>
            <p>Loading: {loading ? 'yes' : 'no'}</p>
            <p>Error: {error ?? 'none'}</p>
          </article>

          <article className="status-card">
            <p className="card-label">Rendered data</p>
            <h2>{data?.name ?? 'Waiting for data'}</h2>
            <p>{data?.role ?? 'No role yet'}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
