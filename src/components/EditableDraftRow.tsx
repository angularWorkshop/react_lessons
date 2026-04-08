import { useState, type ReactElement } from 'react';

export interface DraftItem {
  id: string;
  label: string;
  initialDraft: string;
}

interface EditableDraftRowProps {
  item: DraftItem;
}

export function EditableDraftRow({ item }: EditableDraftRowProps): ReactElement {
  const [draft, setDraft] = useState(item.initialDraft);

  return (
    <label className="draft-row">
      <span>{item.label}</span>
      <input
        aria-label={`Draft for ${item.label}`}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
    </label>
  );
}
