import {
  Component,
  useState,
  type ErrorInfo,
  type ReactElement,
  type ReactNode,
} from 'react';

type RouteKey = 'dashboard' | 'reports' | 'broken';

interface ErrorBoundaryProps {
  children: ReactNode;
  onRetry?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <section className="fallback-card">
          <p className="fallback-card__eyebrow">Error Boundary</p>
          <h2>Something went wrong</h2>
          <p className="fallback-card__text">
            The route crashed during rendering. Add retry logic so the boundary can recover.
          </p>
          <button type="button" className="fallback-card__button" onClick={() => undefined}>
            Try again
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

function BrokenAnalytics({ shouldCrash }: { shouldCrash: boolean }): ReactElement {
  if (shouldCrash) {
    throw new Error('Analytics route crashed');
  }

  return (
    <article className="route-card route-card--success">
      <p className="route-card__eyebrow">Recovered</p>
      <h2>Recovery complete</h2>
      <p className="route-card__text">The route is healthy again after resetting the boundary.</p>
    </article>
  );
}

function RouteViewport({
  route,
  shouldCrash,
}: {
  route: RouteKey;
  shouldCrash: boolean;
}): ReactElement {
  if (route === 'dashboard') {
    return (
      <article className="route-card">
        <p className="route-card__eyebrow">Dashboard</p>
        <h2>Team health</h2>
        <p className="route-card__text">Latency and incidents stay visible inside the main route shell.</p>
      </article>
    );
  }

  if (route === 'reports') {
    return (
      <article className="route-card route-card--secondary">
        <p className="route-card__eyebrow">Reports</p>
        <h2>Weekly summary</h2>
        <p className="route-card__text">Exports, charts, and KPIs render safely until the broken route is opened.</p>
      </article>
    );
  }

  return <BrokenAnalytics shouldCrash={shouldCrash} />;
}

export function App(): ReactElement {
  const [route, setRoute] = useState<RouteKey>('dashboard');
  const [shouldCrash, setShouldCrash] = useState(true);

  return (
    <main className="app-shell">
      <section className="workspace">
        <p className="workspace__eyebrow">Topic 18.1</p>
        <h1>Error boundary workspace</h1>
        <p className="workspace__description">
          Catch rendering failures around the route outlet and add a proper retry path.
        </p>

        <nav className="route-nav" aria-label="Routes">
          <button type="button" onClick={() => setRoute('dashboard')}>
            Dashboard
          </button>
          <button type="button" onClick={() => setRoute('reports')}>
            Reports
          </button>
          <button type="button" onClick={() => setRoute('broken')}>
            Broken route
          </button>
          <button type="button" onClick={() => setShouldCrash(true)}>
            Re-arm crash
          </button>
        </nav>

        <ErrorBoundary onRetry={() => setShouldCrash(false)}>
          <RouteViewport route={route} shouldCrash={shouldCrash} />
        </ErrorBoundary>
      </section>
    </main>
  );
}
