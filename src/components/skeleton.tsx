import type { HTMLAttributes, ReactElement } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const skeletonVariants = cva(
  'animate-pulse motion-reduce:animate-none rounded-2xl bg-slate-200 dark:bg-slate-700',
  {
    variants: {
      shape: {
        text: 'h-4 w-full',
        title: 'h-6 w-3/4',
        avatar: 'h-12 w-12 rounded-full',
        card: 'h-48 w-full',
        badge: 'h-6 w-20 rounded-full',
      },
    },
    defaultVariants: {
      shape: 'text',
    },
  },
);

type SkeletonProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof skeletonVariants>;

export function Skeleton({
  className,
  shape,
  ...props
}: SkeletonProps): ReactElement {
  return (
    <div
      className={cn(skeletonVariants({ shape }), className)}
      aria-hidden="true"
      data-testid="skeleton"
      {...props}
    />
  );
}
