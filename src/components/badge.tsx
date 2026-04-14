import type { ReactElement } from 'react';

import styles from './Badge.module.css';

export type BadgeColor = 'info' | 'success' | 'warning';

interface BadgeProps {
  text: string;
  color?: BadgeColor;
}

export function Badge({ text, color = 'info' }: BadgeProps): ReactElement {
  return <span className={styles[color]}>{text}</span>;
}
