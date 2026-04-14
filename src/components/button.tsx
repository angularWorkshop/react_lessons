import type { ReactElement } from 'react';

import clsx from 'clsx';

import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  label,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  onClick,
}: ButtonProps): ReactElement {
  return (
    <button
      type="button"
      className={clsx(styles[variant], fullWidth && styles.fullWidth)}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
