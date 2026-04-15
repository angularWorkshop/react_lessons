import type { ReactElement } from 'react';

import { cn } from '../lib/utils';

interface UserCardProps {
  name: string;
  role: string;
  animated?: boolean;
  index?: number;
}

export function UserCard({ name, role, animated = false, index = 0 }: UserCardProps): ReactElement {
  return (
    <article
      className={cn(
        'rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl transition-colors dark:border-white/10 dark:bg-white/5',
        // TODO: when animated is true, add 'animate-fade-slide-in' class
        // TODO: when animated is true, add 'motion-reduce:animate-none' class
        // TODO: use animation-delay based on index (e.g., style={{ animationDelay: `${index * 100}ms` }})
      )}
      data-testid="user-card"
    >
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{name}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{role}</p>
    </article>
  );
}
