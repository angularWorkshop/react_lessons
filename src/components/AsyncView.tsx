import type { ReactElement, ReactNode } from 'react';

import type { AsyncState } from '../App';

interface AsyncViewProps<T> {
  state: AsyncState<T>;
  onRetry: () => void;
  renderData: (data: T) => ReactNode;
}

export function AsyncView<T>({
  state,
  onRetry,
  renderData,
}: AsyncViewProps<T>): ReactElement {
  switch (state.status) {
    case 'idle':
      return (
        <section className="async-panel">
          <h2>Idle state</h2>
          <p>Choose a state to preview the async view.</p>
        </section>
      );
    case 'loading':
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
    case 'success':
      return (
        <section className="async-panel">
          <h2>Success state</h2>
          {renderData(state.data)}
        </section>
      );
    case 'error':
      return (
        <section className="async-panel">
          <h2>Error state</h2>
          <p>{state.message}</p>
          <button type="button" className="retry-button" onClick={onRetry}>
            Retry
          </button>
        </section>
      );
    default: {
      const exhaustiveCheck: never = state;
      throw new Error(`Unhandled async state: ${String(exhaustiveCheck)}`);
    }
  }
}
