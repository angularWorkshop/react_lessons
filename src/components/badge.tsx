import type { ReactElement } from 'react';

// TODO: import the CSS Module (Badge.module.css) as `styles`

export type BadgeColor = 'info' | 'success' | 'warning';

interface BadgeProps {
  text: string;
  color?: BadgeColor;
}

export function Badge({ text, color = 'info' }: BadgeProps): ReactElement {
  // TODO: use CSS Modules — styles[color] gives the right class

  return <span>{text}</span>;
}
