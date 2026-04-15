import type { HTMLAttributes, ReactElement } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]',
  {
    variants: {
      tone: {
        info: 'bg-cyan-400/10 text-cyan-100 ring-1 ring-cyan-300/20',
        success: 'bg-emerald-400/10 text-emerald-100 ring-1 ring-emerald-300/20',
        warning: 'bg-amber-400/10 text-amber-100 ring-1 ring-amber-300/20',
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
