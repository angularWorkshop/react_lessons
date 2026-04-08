import type { ReactElement } from 'react';

interface AvatarProps {
  src: string;
  alt: string;
}

export function Avatar({ src, alt }: AvatarProps): ReactElement {
  return (
    <div className="avatar-frame">
      <img className="avatar-image" src={src} alt={alt} />
    </div>
  );
}
