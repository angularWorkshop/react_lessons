import { useState, type ReactElement } from 'react';

import { EditableDraftRow, type DraftItem } from './components/EditableDraftRow';

const INITIAL_ITEMS: DraftItem[] = [
  { id: 'alpha', label: 'Alpha', initialDraft: 'Plan docs' },
  { id: 'beta', label: 'Beta', initialDraft: '' },
  { id: 'gamma', label: 'Gamma', initialDraft: '' },
];

const PREPENDED_ITEM: DraftItem = {
  id: 'delta',
  label: 'Delta',
  initialDraft: '',
};

export function App(): ReactElement {
  const [items, setItems] = useState<DraftItem[]>(INITIAL_ITEMS);
  const [hasPrepended, setHasPrepended] = useState(false);

  const prependItem = (): void => {
    if (hasPrepended) {
      return;
    }

    setItems((currentItems) => [PREPENDED_ITEM, ...currentItems]);
    setHasPrepended(true);
  };

  return (
    <main className="app-shell">
      <div className="hero-card keys-shell">
        <p className="eyebrow">Topic 9.1</p>
        <h1>Index key bug</h1>
        <p className="description">
          Type into a row, prepend a new item, and watch what happens when the key is unstable.
        </p>

        <button
          type="button"
          className="prepend-button"
          onClick={prependItem}
          disabled={hasPrepended}
        >
          Prepend item
        </button>

        <div className="draft-list" aria-label="Draft rows">
          {items.map((item) => (
            // Stable id keys keep row-local input state attached to the same item.
            <EditableDraftRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
