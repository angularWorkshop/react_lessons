import {
  Profiler,
  memo,
  useState,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';

interface ThemeConfig {
  tone: string;
  surface: string;
}

interface MetricsSummary {
  title: string;
  delta: string;
}

interface ActivityItem {
  id: string;
  label: string;
}

interface DashboardPageProps {
  title: string;
  themeConfig: ThemeConfig;
  summary: MetricsSummary;
  activity: ActivityItem[];
  onInspect: (targetId: string) => void;
}

const ACTIVITY_ITEMS: ActivityItem[] = [
  { id: 'deploys', label: 'Deploy queue stable' },
  { id: 'latency', label: 'P95 latency dropped by 14%' },
  { id: 'alerts', label: 'No paging alerts in the last hour' },
];

const renderCountMap = new Map<string, number>();

function nextRenderCount(componentName: string): number {
  const nextValue = (renderCountMap.get(componentName) ?? 0) + 1;
  renderCountMap.set(componentName, nextValue);
  return nextValue;
}

function SectionCard({ children }: PropsWithChildren): ReactElement {
  return <section className="section-card">{children}</section>;
}

const AnalyticsCard = memo(function AnalyticsCard({
  summary,
  onInspect,
}: {
  summary: MetricsSummary;
  onInspect: (targetId: string) => void;
}): ReactElement {
  const renderCount = nextRenderCount('AnalyticsCard');

  return (
    <SectionCard>
      <p className="eyebrow">Analytics card renders: {renderCount}</p>
      <h2>{summary.title}</h2>
      <p className="card-copy">Quarter-on-quarter movement: {summary.delta}</p>
      <button type="button" onClick={() => onInspect('analytics-card')}>
        Inspect analytics card
      </button>
    </SectionCard>
  );
});

const ActivityCard = memo(function ActivityCard({
  activity,
}: {
  activity: ActivityItem[];
}): ReactElement {
  const renderCount = nextRenderCount('ActivityCard');

  return (
    <SectionCard>
      <p className="eyebrow">Activity card renders: {renderCount}</p>
      <h2>Activity feed</h2>
      <ul className="activity-list">
        {activity.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
      </ul>
    </SectionCard>
  );
});

const InsightsColumn = memo(function InsightsColumn({
  summary,
  activity,
  onInspect,
}: {
  summary: MetricsSummary;
  activity: ActivityItem[];
  onInspect: (targetId: string) => void;
}): ReactElement {
  return (
    <div className="insights-column">
      <AnalyticsCard summary={summary} onInspect={onInspect} />
      <ActivityCard activity={activity} />
    </div>
  );
});

const WorkspaceFrame = memo(function WorkspaceFrame({
  title,
  children,
  themeConfig,
}: PropsWithChildren<{ title: string; themeConfig: ThemeConfig }>): ReactElement {
  return (
    <section className={themeConfig.surface === 'glass' ? 'workspace-frame workspace-frame--glass' : 'workspace-frame'}>
      <header className="workspace-frame__header">
        <p className="workspace-frame__eyebrow">{themeConfig.tone}</p>
        <h1>{title}</h1>
      </header>
      {children}
    </section>
  );
});

const DashboardPage = memo(function DashboardPage({
  title,
  themeConfig,
  summary,
  activity,
  onInspect,
}: DashboardPageProps): ReactElement {
  return (
    <WorkspaceFrame title={title} themeConfig={themeConfig}>
      <InsightsColumn summary={summary} activity={activity} onInspect={onInspect} />
    </WorkspaceFrame>
  );
});

export function App(): ReactElement {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [lastProfileSummary, setLastProfileSummary] = useState('No profiler events yet');
  const [lastInspection, setLastInspection] = useState('Nothing inspected yet');

  const themeConfig: ThemeConfig = { tone: 'Performance review', surface: 'glass' };
  const summary: MetricsSummary = { title: 'Component tree audit', delta: '+12%' };
  const activity = [...ACTIVITY_ITEMS];

  function handleInspect(targetId: string): void {
    setLastInspection(`Inspected: ${targetId}`);
  }

  function handleProfilerRender(
    id: string,
    phase: 'mount' | 'update' | 'nested-update',
    actualDuration: number,
  ): void {
    setLastProfileSummary(`${id} ${phase} ${actualDuration.toFixed(2)}ms`);
  }

  return (
    <main className="app-shell">
      <div className="page-controls">
        <button type="button" onClick={() => setBannerVisible((current) => !current)}>
          Toggle audit banner
        </button>
      </div>

      {bannerVisible ? <p className="audit-banner">Audit banner enabled</p> : null}

      <div className="meta-bar">
        <p>{lastProfileSummary}</p>
        <p>{lastInspection}</p>
      </div>

      <Profiler id="dashboard-tree" onRender={handleProfilerRender}>
        <DashboardPage
          title="Component tree optimization workspace"
          themeConfig={themeConfig}
          summary={summary}
          activity={activity}
          onInspect={handleInspect}
        />
      </Profiler>
    </main>
  );
}
