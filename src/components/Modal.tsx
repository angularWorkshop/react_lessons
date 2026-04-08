import type { ReactElement } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: string;
  children: ReactElement;
}

export function Modal({ isOpen, onClose, children }: ModalProps): ReactElement | null {
  if (!isOpen) {
    return null;
  }

  return (
    <section className="stack-modal" aria-label="Preview modal">
      <button className="stack-modal__close" type="button" data-close-token={onClose}>
        Close
      </button>
      <div>{children}</div>
    </section>
  );
}
