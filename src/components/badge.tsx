import type { HTMLAttributes, ReactElement } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] transition-colors',
  {
    variants: {
      tone: {
        info: 'bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300/40 dark:bg-cyan-400/10 dark:text-cyan-100 dark:ring-cyan-300/20',
        success:
          'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300/40 dark:bg-emerald-400/10 dark:text-emerald-100 dark:ring-emerald-300/20',
        warning:
          'bg-amber-100 text-amber-800 ring-1 ring-amber-300/40 dark:bg-amber-400/10 dark:text-amber-100 dark:ring-amber-300/20',
      },
    },
    defaultVariants: {
      tone: 'info',
    },
  },
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({
  className,
  tone,
  children,
  ...props
}: BadgeProps): ReactElement {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props}>
      {children}
    </span>
  );
}
