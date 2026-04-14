import type { ReactElement } from 'react';

import styles from './InfoCard.module.css';

interface InfoCardProps {
  title: string;
  children: string;
}

export function InfoCard({ title, children }: InfoCardProps): ReactElement {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{children}</p>
    </div>
  );
}
