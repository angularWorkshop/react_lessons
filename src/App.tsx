import type { ReactElement } from 'react';

import { Alert } from './components/alert';
import { Badge } from './components/badge';
import { Button } from './components/button';
import { Card } from './components/card';
import { Input } from './components/input';

export function App(): ReactElement {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-50 sm:px-6">
      <section className="mx-auto w-full max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Topic 32.2</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
          Tailwind UI Kit with CVA
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          Turn component styling into a typed API and show every family in one preview workspace.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-white">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-white">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge>Info</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-white">Inputs</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Workspace name" placeholder="Orbit Studio" />
            <Input label="Contact email" placeholder="team@orbit.dev" invalid />
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <Card title="Default card">
            Compose layout, spacing, colors, and states as reusable component variants.
          </Card>
          <Card title="Highlight card" highlighted>
            Expose a second presentation style without duplicating the whole component.
          </Card>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-white">Alerts</h2>
          <Alert title="Success alert">
            Component contracts stay readable when visual variants move into CVA definitions.
          </Alert>
          <Alert title="Danger alert" tone="danger">
            Error states should be just as declarative as the happy path.
          </Alert>
        </section>
      </section>
    </main>
  );
}
