import { memo, useCallback, useRef, useState, type ReactElement } from 'react';

interface LessonChipProps {
  selectedId: string;
  onSelect: (nextId: string) => void;
}

const LESSON_OPTIONS = [
  { id: 'hooks', label: 'Hooks' },
  { id: 'profiling', label: 'Profiling' },
  { id: 'memo', label: 'Memoization' },
] as const;

const MemoizedLessonChips = memo(function MemoizedLessonChips({
  selectedId,
  onSelect,
}: LessonChipProps): ReactElement {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  return (
    <section className="chip-panel" aria-label="Lesson picker">
      <div className="section-header">
        <h2>Lesson picker</h2>
        <span>Child renders: {renderCountRef.current}</span>
      </div>

      <div className="chip-row">
        {LESSON_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            className={option.id === selectedId ? 'chip chip--active' : 'chip'}
            onClick={() => onSelect(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
});

export function App(): ReactElement {
  const [selectedId, setSelectedId] = useState('hooks');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const handleSelect = useCallback((nextId: string): void => {
    setSelectedId(nextId);
  }, []);

  return (
    <main className="app-shell">
      <section className="callback-shell">
        <p className="eyebrow">Topic 13.2</p>
        <h1>Memoized child actions</h1>
        <p className="description">
          Keep memoized children stable when the parent updates unrelated state.
        </p>

        <div className="layout-grid">
          <div className="info-panel">
            <p>Selected lesson: {selectedId}</p>
            <p>Sidebar expanded: {sidebarExpanded ? 'yes' : 'no'}</p>
            <button type="button" onClick={() => setSidebarExpanded((value) => !value)}>
              Toggle sidebar {sidebarExpanded ? 'on' : 'off'}
            </button>
          </div>

          <MemoizedLessonChips selectedId={selectedId} onSelect={handleSelect} />
        </div>
      </section>
    </main>
  );
}
