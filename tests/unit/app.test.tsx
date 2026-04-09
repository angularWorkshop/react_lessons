import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { App } from '../../src/App';

describe('Topic 20.1 runtime', () => {
  it('renders the optimization workspace and deep cards', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Component tree optimization workspace' })).toBeInTheDocument();
    expect(screen.getByText('Analytics card renders: 1')).toBeInTheDocument();
    expect(screen.getByText('Activity card renders: 1')).toBeInTheDocument();
  });

  it('does not re-render deep memoized leaves on unrelated banner toggles', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Toggle audit banner' }));

    expect(screen.getByText('Audit banner enabled')).toBeInTheDocument();
    expect(screen.getByText('Analytics card renders: 1')).toBeInTheDocument();
    expect(screen.getByText('Activity card renders: 1')).toBeInTheDocument();
  });
});

describe('Topic 20.1 source checks', () => {
  const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');
  const mainSource = readFileSync(resolve(process.cwd(), 'src/main.tsx'), 'utf8');
  const wdyrSource = readFileSync(resolve(process.cwd(), 'src/wdyr.ts'), 'utf8');

  it('connects why-did-you-render in development mode', () => {
    expect(mainSource).toMatch(/import '\.\/wdyr';/);
    expect(wdyrSource).toMatch(/whyDidYouRender\(React, \{ trackAllPureComponents: true \}\)/);
  });

  it('wraps the tree in Profiler and memoizes the deep components', () => {
    expect(appSource).toMatch(/<Profiler id="dashboard-tree" onRender=\{handleProfilerRender\}>/);
    expect(appSource).toMatch(/const DashboardPage = memo\(function DashboardPage/);
    expect(appSource).toMatch(/const InsightsColumn = memo\(function InsightsColumn/);
  });

  it('stabilizes derived props with useMemo and useCallback', () => {
    expect(appSource).toMatch(/const themeConfig = useMemo<ThemeConfig>\(/);
    expect(appSource).toMatch(/const summary = useMemo<MetricsSummary>\(/);
    expect(appSource).toMatch(/const activity = useMemo<ActivityItem\[]>\(/);
    expect(appSource).toMatch(/const handleInspect = useCallback\(\(targetId: string\): void =>/);
  });
});
