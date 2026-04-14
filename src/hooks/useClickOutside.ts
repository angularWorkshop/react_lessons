import { type RefObject } from 'react';

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
): void {
  if (!ref.current) {
    return;
  }

  void handler;
}
