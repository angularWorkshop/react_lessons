import { Suspense, lazy, useState, type ComponentType, type ReactElement } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import { HomePage } from './routes/HomePage';

type LazyRouteModule = { default: ComponentType };

let analyticsRoutePromise: Promise<LazyRouteModule> | null = null;
let reportsRoutePromise: Promise<LazyRouteModule> | null = null;

function loadAnalyticsRoute(): Promise<LazyRouteModule> {
  if (!analyticsRoutePromise) {
    analyticsRoutePromise = import('./routes/AnalyticsPage').then((module) => ({
      default: module.AnalyticsPage,
    }));
  }

  return analyticsRoutePromise;
}

function loadReportsRoute(): Promise<LazyRouteModule> {
  if (!reportsRoutePromise) {
    reportsRoutePromise = import('./routes/ReportsPage').then((module) => ({
      default: module.ReportsPage,
    }));
  }

  return reportsRoutePromise;
}

const AnalyticsPage = lazy(() => loadAnalyticsRoute());
const ReportsPage = lazy(() => loadReportsRoute());

function RouteSkeleton(): ReactElement {
  return (
    <section className="route-panel route-panel--skeleton" aria-label="Route loading state">
      <p className="eyebrow">Loading route</p>
      <h2>Preparing chunk...</h2>
      <div className="skeleton-lines">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

interface NavigationProps {
  preloadReady: boolean;
  preloadAnalyticsRoute: () => void;
}

function Navigation({ preloadReady, preloadAnalyticsRoute }: NavigationProps): ReactElement {
  return (
    <nav className="top-nav" aria-label="Primary navigation">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/analytics" onMouseEnter={preloadAnalyticsRoute}>
        Analytics
      </NavLink>
      <NavLink to="/reports">Reports</NavLink>
      <span className="nav-status">{preloadReady ? 'Analytics preload ready' : 'Analytics preload idle'}</span>
    </nav>
  );
}

export function App(): ReactElement {
  const [analyticsPreloaded, setAnalyticsPreloaded] = useState(false);

  function preloadAnalyticsRoute(): void {
    void loadAnalyticsRoute().then(() => {
      setAnalyticsPreloaded(true);
    });
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="hero">
          <div>
            <p className="eyebrow">Topic 21.1</p>
            <h1>Lazy routes workspace</h1>
            <p className="hero-copy">
              Heavy routes now load on demand, a route-level skeleton covers transitions, and analytics can be warmed
              up before navigation.
            </p>
          </div>
          <div className="hero-meta">
            <p>Bundle analysis script: ready via npm run build:analyze</p>
            <p>Heavy route preload: {analyticsPreloaded ? 'armed' : 'idle'}</p>
          </div>
        </header>

        <Navigation preloadReady={analyticsPreloaded} preloadAnalyticsRoute={preloadAnalyticsRoute} />

        <Suspense fallback={<RouteSkeleton />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
