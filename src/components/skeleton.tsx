import type { ReactElement } from 'react';

export function Skeleton({ label = 'Loading…' }: { label?: string }): ReactElement {
  return (
    <div className="skeleton" role="status" aria-label={label}>
      <div className="skeleton__bar" />
      <div className="skeleton__bar skeleton__bar--short" />
      <div className="skeleton__bar skeleton__bar--medium" />
    </div>
  );
}
