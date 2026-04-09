import { Children, cloneElement, isValidElement, useState, type ReactElement, type ReactNode } from 'react';

interface TabsRootProps {
  children: ReactNode;
  defaultValue: string;
}

interface TabsTabProps {
  value: string;
  children: ReactNode;
  activeValue?: string;
  onSelect?: (value: string) => void;
}

interface TabsPanelProps {
  value: string;
  children: ReactNode;
  activeValue?: string;
}

interface TabsComponent {
  (props: TabsRootProps): ReactElement;
  Tab: (props: TabsTabProps) => ReactElement;
  Panel: (props: TabsPanelProps) => ReactElement | null;
}

function TabsRoot({ children, defaultValue }: TabsRootProps): ReactElement {
  const [activeValue] = useState(defaultValue);

  return (
    <section className="tabs-shell">
      {Children.map(children, (child) => {
        if (!isValidElement<TabsTabProps | TabsPanelProps>(child)) {
          return child;
        }

        return cloneElement(child, {
          activeValue,
        });
      })}
    </section>
  );
}

function TabsTab({ value, children, activeValue }: TabsTabProps): ReactElement {
  const isActive = value === activeValue;

  return (
    <button type="button" className={isActive ? 'tab-button tab-button--active' : 'tab-button'}>
      {children}
    </button>
  );
}

function TabsPanel({ value, children, activeValue }: TabsPanelProps): ReactElement | null {
  if (value !== activeValue) {
    return null;
  }

  return <article className="tab-panel">{children}</article>;
}

const Tabs = TabsRoot as TabsComponent;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;

export function App(): ReactElement {
  return (
    <main className="app-shell">
      <section className="compound-demo">
        <p className="eyebrow">Topic 16.1</p>
        <h1>Compound tabs workspace</h1>
        <p className="description">
          Build a typed compound component API without leaking tab state through props.
        </p>

        <Tabs defaultValue="overview">
          <div className="tab-list" role="tablist" aria-label="Course sections">
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="syllabus">Syllabus</Tabs.Tab>
            <Tabs.Tab value="faq">FAQ</Tabs.Tab>
          </div>

          <Tabs.Panel value="overview">
            <h2>Overview</h2>
            <p>React patterns, performance, and architecture for real applications.</p>
          </Tabs.Panel>

          <Tabs.Panel value="syllabus">
            <h2>Syllabus</h2>
            <p>Hooks, data fetching, component patterns, routing, and testing.</p>
          </Tabs.Panel>

          <Tabs.Panel value="faq">
            <h2>FAQ</h2>
            <p>How context, compounds, and reusable APIs fit together in one design system.</p>
          </Tabs.Panel>
        </Tabs>
      </section>
    </main>
  );
}
