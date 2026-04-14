import type { ReactElement } from 'react';

import { Badge } from './components/badge';
import { Button } from './components/button';
import { Card } from './components/card';

export function App(): ReactElement {
  return (
    <main className="app-shell">
      <section className="workspace">
        <p className="workspace__eyebrow">Topic 30.1</p>
        <h1>CSS Modules UI Kit</h1>
        <p className="workspace__description">
          Build Button, Card, and Badge components using CSS Modules with composes and clsx.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
          <Button label="Primary" variant="primary" />
          <Button label="Secondary" variant="secondary" />
          <Button label="Danger" variant="danger" />
          <Button label="Disabled" disabled />
        </div>

        <div style={{ marginTop: 24 }}>
          <Button label="Full width button" variant="primary" fullWidth />
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <Badge text="Info" color="info" />
          <Badge text="Success" color="success" />
          <Badge text="Warning" color="warning" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
          <Card title="Regular card">This card has default styling with a subtle shadow.</Card>
          <Card title="Elevated card" elevated>
            This card uses the elevated variant with a deeper shadow.
          </Card>
        </div>
      </section>
    </main>
  );
}
