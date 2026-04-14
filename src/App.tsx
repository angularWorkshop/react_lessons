import type { ReactElement } from 'react';

import { InfoCard } from './components/info-card';
import { ThemeToggle } from './components/theme-toggle';
import { useTheme } from './hooks/use-theme';

export function App(): ReactElement {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="app-shell">
      <section className="workspace">
        <p className="workspace__eyebrow">Topic 30.2</p>
        <h1>Dark theme with CSS variables</h1>
        <p className="workspace__description">
          Toggle between light and dark themes using CSS Custom Properties.
          Components should never hardcode colors — only reference variables.
        </p>

        <div style={{ marginTop: 24 }}>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
          <InfoCard title="CSS Custom Properties">
            Define colors once in :root, override them in [data-theme=dark]. Every component inherits the change automatically.
          </InfoCard>
          <InfoCard title="No component changes">
            When the theme switches, components don't need to know. They reference var(--color-text) and the value just changes.
          </InfoCard>
        </div>
      </section>
    </main>
  );
}
