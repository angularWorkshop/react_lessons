import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 21.1 runtime', () => {
  it('renders the lazy routes workspace shell', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Lazy routes workspace' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Analytics' })).toBeInTheDocument();
    expect(screen.getByText('Bundle analysis script: ready via npm run build:analyze')).toBeInTheDocument();
  });
});

describe('Topic 21.1 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');
  const packageSource = readFileSync(resolve(process.cwd(), 'package.json'), 'utf8');
  const viteSource = readFileSync(resolve(process.cwd(), 'vite.config.ts'), 'utf8');

  it('splits heavy routes with React.lazy and Suspense', () => {
    expect(appSource).toMatch(/const AnalyticsPage = lazy\(\(\) =>/);
    expect(appSource).toMatch(/const ReportsPage = lazy\(\(\) =>/);
    expect(appSource).toMatch(/<Suspense fallback=\{<RouteSkeleton \/>}>\s*<Routes>/);
  });

  it('preloads the heavy route on hover', () => {
    expect(appSource).toMatch(/onMouseEnter=\{preloadAnalyticsRoute}/);
    expect(appSource).toMatch(/function preloadAnalyticsRoute\(\): void/);
  });

  it('configures bundle analysis for the split build', () => {
    expect(packageSource).toMatch(/"build:analyze": "vite build --mode analyze"/);
    expect(viteSource).toMatch(/visualizer/);
  });
});
