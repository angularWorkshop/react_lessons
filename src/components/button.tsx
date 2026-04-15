import type { ButtonHTMLAttributes, ReactElement } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-cyan-500 text-white hover:bg-cyan-600 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300',
        secondary:
          'border border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10',
        danger:
          'bg-rose-500 text-white hover:bg-rose-600 dark:hover:bg-rose-400',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  children,
  ...props
}: ButtonProps): ReactElement {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props}>
      {children}
    </button>
  );
}
