import type { ReactElement } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import { AnalyticsPage } from './routes/AnalyticsPage';
import { HomePage } from './routes/HomePage';
import { ReportsPage } from './routes/ReportsPage';

function Navigation(): ReactElement {
  return (
    <nav className="top-nav" aria-label="Primary navigation">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/analytics">Analytics</NavLink>
      <NavLink to="/reports">Reports</NavLink>
    </nav>
  );
}

export function App(): ReactElement {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="hero">
          <div>
            <p className="eyebrow">Topic 21.1</p>
            <h1>Lazy routes workspace</h1>
            <p className="hero-copy">
              Starter version: the app already has separate pages, but all routes are imported eagerly and no preload
              strategy exists yet.
            </p>
          </div>
          <div className="hero-meta">
            <p>Bundle analysis script: not configured</p>
            <p>Heavy route preload: inactive</p>
          </div>
        </header>

        <Navigation />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
