import type { HTMLAttributes, ReactElement } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const cardVariants = cva('rounded-[28px] border p-6 shadow-xl', {
  variants: {
    tone: {
      default: 'border-white/10 bg-white/5',
      highlight: 'border-cyan-300/30 bg-cyan-400/10',
    },
  },
  defaultVariants: {
    tone: 'default',
  },
});

type CardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & {
  title: string;
  highlighted?: boolean;
};

export function Card({
  title,
  className,
  highlighted = false,
  tone,
  children,
  ...props
}: CardProps): ReactElement {
  return (
    <article className={cn(cardVariants({ tone: highlighted ? 'highlight' : tone }), className)} {...props}>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{children}</p>
    </article>
  );
}
