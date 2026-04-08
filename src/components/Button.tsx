import type { ComponentPropsWithoutRef, ReactElement } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
}

export function Button({
  label,
  variant,
  size,
  type = 'button',
  ...rest
}: ButtonProps): ReactElement {
  return (
    <button
      className={`button button--${variant} button--${size}`}
      type={type}
      {...rest}
    >
      {label}
    </button>
  );
}
