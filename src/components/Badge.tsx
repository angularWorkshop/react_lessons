import type { ReactElement } from 'react';

interface BadgeProps {
  label: string;
  tone: 'active';
}

export function Badge({ label, tone }: BadgeProps): ReactElement {
  return <span className={`badge badge--${tone}`}>{label}</span>;
}
