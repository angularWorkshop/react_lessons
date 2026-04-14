import type { ReactElement } from 'react';

import styles from './Card.module.css';

interface CardProps {
  title: string;
  children: string;
  elevated?: boolean;
}

export function Card({ title, children, elevated = false }: CardProps): ReactElement {
  return (
    <div className={elevated ? styles.elevated : styles.card}>
      <h3 className={styles.header}>{title}</h3>
      <p className={styles.body}>{children}</p>
    </div>
  );
}
