import { useState, type ComponentType, type ReactElement } from 'react';

interface ProfileCardProps {
  name: string;
  role: string;
  isOnline: boolean;
  viewers: number;
}

function ProfileCard({ name, role, isOnline, viewers }: ProfileCardProps): ReactElement {
  return (
    <article className="profile-card">
      <div className="profile-card__header">
        <p className="eyebrow">Topic 17.1</p>
        <span className={isOnline ? 'status-badge status-badge--online' : 'status-badge'}>
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>

      <h1>{name}</h1>
      <p className="profile-card__role">{role}</p>

      <dl className="profile-metrics">
        <div>
          <dt>Viewers</dt>
          <dd>{viewers}</dd>
        </div>
        <div>
          <dt>Pattern</dt>
          <dd>withLogger HOC</dd>
        </div>
      </dl>
    </article>
  );
}

function withLogger<P extends object>(Component: ComponentType<P>): ComponentType<P> {
  const componentName = Component.displayName || Component.name || 'Component';

  function WrappedComponent(props: P): ReactElement {
    console.log('[withLogger] render', props);
    return <Component {...props} />;
  }

  WrappedComponent.displayName = `withLogger(${componentName})`;

  return WrappedComponent;
}

export const LoggedProfileCard = withLogger(ProfileCard);

export function App(): ReactElement {
  const [viewers, setViewers] = useState(128);
  const [isOnline, setIsOnline] = useState(true);

  return (
    <main className="app-shell">
      <section className="workspace-panel">
        <p className="workspace-panel__label">Render Props and HOC</p>
        <h2>withLogger workspace</h2>
        <p className="workspace-panel__description">
          Wrap the profile card in a typed HOC that logs props and keeps a readable component name.
        </p>

        <div className="workspace-actions">
          <button type="button" onClick={() => setViewers((current) => current + 1)}>
            Add viewer
          </button>
          <button type="button" onClick={() => setIsOnline((current) => !current)}>
            Toggle status
          </button>
        </div>

        <LoggedProfileCard
          name="Max"
          role="Platform Engineer"
          isOnline={isOnline}
          viewers={viewers}
        />
      </section>
    </main>
  );
}
