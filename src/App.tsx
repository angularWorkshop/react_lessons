import { createContext, useContext, useMemo, useState, type ReactElement, type ReactNode } from 'react';

interface TabsRootProps {
  children: ReactNode;
  defaultValue: string;
}

interface TabsTabProps {
  value: string;
  children: ReactNode;
}

interface TabsPanelProps {
  value: string;
  children: ReactNode;
}

interface TabsContextValue {
  activeValue: string;
  setActiveValue: (value: string) => void;
}

interface TabsComponent {
  (props: TabsRootProps): ReactElement;
  Tab: (props: TabsTabProps) => ReactElement;
  Panel: (props: TabsPanelProps) => ReactElement | null;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tabs components must be used within Tabs');
  }

  return context;
}

function TabsRoot({ children, defaultValue }: TabsRootProps): ReactElement {
  const [activeValue, setActiveValue] = useState(defaultValue);
  const contextValue = useMemo<TabsContextValue>(
    () => ({
      activeValue,
      setActiveValue,
    }),
    [activeValue],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <section className="tabs-shell">{children}</section>
    </TabsContext.Provider>
  );
}

function TabsTab({ value, children }: TabsTabProps): ReactElement {
  const { activeValue, setActiveValue } = useTabsContext();
  const isActive = value === activeValue;

  return (
    <button
      type="button"
      className={isActive ? 'tab-button tab-button--active' : 'tab-button'}
      onClick={() => setActiveValue(value)}
    >
      {children}
    </button>
  );
}

function TabsPanel({ value, children }: TabsPanelProps): ReactElement | null {
  const { activeValue } = useTabsContext();

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
