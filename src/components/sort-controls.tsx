import type { SortField, SortDirection } from '../types/todo';

interface SortControlsProps {
  field: SortField;
  direction: SortDirection;
  onChangeField: (field: SortField) => void;
  onToggleDirection: () => void;
}

export function SortControls({
  field,
  direction,
  onChangeField,
  onToggleDirection,
}: SortControlsProps) {
  return (
    <div className="sort-controls">
      <span>Sort by:</span>
      <button
        className={`sort-controls__button${field === 'priority' ? ' sort-controls__button--active' : ''}`}
        onClick={() => onChangeField('priority')}
      >
        Priority
      </button>
      <button
        className={`sort-controls__button${field === 'createdAt' ? ' sort-controls__button--active' : ''}`}
        onClick={() => onChangeField('createdAt')}
      >
        Date
      </button>
      <button className="sort-controls__button" onClick={onToggleDirection}>
        {direction === 'asc' ? '↑ Asc' : '↓ Desc'}
      </button>
    </div>
  );
}
