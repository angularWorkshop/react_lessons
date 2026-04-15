import type { ReactElement } from 'react';

import { Alert } from './components/alert';
import { Badge } from './components/badge';
import { Button } from './components/button';
import { Card } from './components/card';
import { Input } from './components/input';
import { ThemeToggle } from './components/theme-toggle';

export function App(): ReactElement {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 transition-colors sm:px-6 dark:bg-slate-950 dark:text-slate-50">
      <section className="mx-auto w-full max-w-6xl">
        <header className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-300">
              Topic 33.1
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Dark Theme
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Toggle between light and dark modes with smooth transitions and system preference detection.
            </p>
          </div>
          <ThemeToggle />
        </header>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge>Info</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Inputs</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Workspace name" placeholder="Orbit Studio" />
            <Input label="Contact email" placeholder="team@orbit.dev" invalid />
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <Card title="Default card">
            Light and dark variants adapt the same component contract to both themes.
          </Card>
          <Card title="Highlight card" highlighted>
            Accent styles shift palette without duplicating the whole component.
          </Card>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Alerts</h2>
          <Alert title="Success alert">
            Theme-aware alerts keep readability in both modes.
          </Alert>
          <Alert title="Danger alert" tone="danger">
            Error states stay visible regardless of background brightness.
          </Alert>
        </section>
      </section>
    </main>
  );
}
