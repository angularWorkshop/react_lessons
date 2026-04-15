import type { Filter } from '../types/todo';

interface FilterBarProps {
  current: Filter;
  onChange: (filter: Filter) => void;
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function FilterBar({ current, onChange }: FilterBarProps) {
  return (
    <div className="filter-bar">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          className={`filter-bar__button${current === value ? ' filter-bar__button--active' : ''}`}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
