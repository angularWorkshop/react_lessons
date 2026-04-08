import type { ReactElement } from 'react';

import { Card } from './components/Card';
import { Modal } from './components/Modal';

export function App(): ReactElement {
  return (
    <main className="app-shell">
      <div className="hero-card modal-demo-shell">
        <p className="eyebrow">Topic 4.2</p>
        <h1>Children and typed callbacks</h1>
        <p className="description">
          Practice reusable container components that accept children and optional slots.
        </p>

        <Card
          title="Release checklist"
          footer="Last updated 5 minutes ago"
        >
          <p className="stack-text">Ship the typed props API before the sprint review.</p>
        </Card>

        <Modal isOpen={true} onClose="close-modal">
          <p className="stack-text">Review the release notes before publishing the package.</p>
        </Modal>
      </div>
    </main>
  );
}
