import type { ReactElement, ReactNode } from 'react';

import type { AsyncState } from '../App';

interface LessonCard {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate';
}

interface AsyncViewProps {
  state: AsyncState<LessonCard[]>;
  onRetry: () => void;
  renderData: (data: LessonCard[]) => ReactNode;
}

export function AsyncView({ state, renderData }: AsyncViewProps): ReactElement {
  if (state.status === 'idle') {
    return (
      <section className="async-panel">
        <h2>Idle state</h2>
        <p>Choose a state to preview the async view.</p>
      </section>
    );
  }

  if (state.status === 'loading') {
    return (
      <section className="async-panel" aria-label="Loading skeleton">
        <h2>Loading state</h2>
        <div className="skeleton-stack">
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
      </section>
    );
  }

  if (state.status === 'success') {
    return (
      <section className="async-panel">
        <h2>Success state</h2>
        {renderData(state.data)}
      </section>
    );
  }

  return (
    <section className="async-panel">
      <h2>Error state</h2>
      <p>{state.message}</p>
      <button type="button" className="retry-button">
        Retry
      </button>
    </section>
  );
}
