import {
  useActionState,
  useEffect,
  useOptimistic,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import { useFormStatus } from 'react-dom';

type InviteStatus = 'confirmed' | 'sending';

interface InviteRecord {
  id: string;
  name: string;
  email: string;
  status: InviteStatus;
  requestedLabel: string;
}

interface WaitlistActionState {
  status: 'idle' | 'success' | 'error';
  message: string;
}

interface WaitlistValues {
  name: string;
  email: string;
}

const INITIAL_INVITES: InviteRecord[] = [
  {
    id: 'invite-1',
    name: 'Marta Quinn',
    email: 'marta@northstar.dev',
    status: 'confirmed',
    requestedLabel: 'Queued for review',
  },
  {
    id: 'invite-2',
    name: 'Diego Ramires',
    email: 'diego@shoreline.dev',
    status: 'confirmed',
    requestedLabel: 'Queued for review',
  },
];

const INITIAL_FORM_STATE: WaitlistActionState = {
  status: 'idle',
  message: '',
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createInviteRecord(values: WaitlistValues, status: InviteStatus): InviteRecord {
  return {
    id: `${status}-${values.email}`,
    name: values.name,
    email: values.email,
    status,
    requestedLabel: status === 'sending' ? 'Sending request…' : 'Queued for review',
  };
}

function SubmitButton(): ReactElement {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={pending ? 'submit-button submit-button--pending' : 'submit-button'}
      disabled={pending}
    >
      {pending ? 'Sending request…' : 'Request invite'}
    </button>
  );
}

export function App(): ReactElement {
  const formRef = useRef<HTMLFormElement>(null);
  const [invites, setInvites] = useState<InviteRecord[]>(INITIAL_INVITES);
  const [optimisticInvites, addOptimisticInvite] = useOptimistic(
    invites,
    (currentInvites: InviteRecord[], optimisticInvite: InviteRecord) => [
      optimisticInvite,
      ...currentInvites,
    ],
  );

  const [formState, formAction] = useActionState<WaitlistActionState, FormData>(
    async (_previousState, formData) => {
      const values: WaitlistValues = {
        name: normalizeName(String(formData.get('name') ?? '')),
        email: String(formData.get('email') ?? '').trim().toLowerCase(),
      };

      if (values.name.length < 2) {
        return {
          status: 'error',
          message: 'Name must be at least 2 characters long.',
        } satisfies WaitlistActionState;
      }

      if (!isValidEmail(values.email)) {
        return {
          status: 'error',
          message: 'Enter a valid work email.',
        } satisfies WaitlistActionState;
      }

      if (invites.some((invite) => invite.email === values.email)) {
        return {
          status: 'error',
          message: 'This email is already on the waitlist.',
        } satisfies WaitlistActionState;
      }

      const optimisticInvite = createInviteRecord(values, 'sending');
      addOptimisticInvite(optimisticInvite);
      await sleep(180);

      if (values.email.endsWith('@blocked.dev')) {
        return {
          status: 'error',
          message: 'Invites for blocked.dev are paused for this batch.',
        } satisfies WaitlistActionState;
      }

      const confirmedInvite = createInviteRecord(values, 'confirmed');
      setInvites((currentInvites) => [confirmedInvite, ...currentInvites]);

      return {
        status: 'success',
        message: `Invite request sent for ${confirmedInvite.email}.`,
      } satisfies WaitlistActionState;
    },
    INITIAL_FORM_STATE,
  );

  useEffect(() => {
    if (formState.status === 'success') {
      formRef.current?.reset();
    }
  }, [formState.status]);

  return (
    <main className="app-shell">
      <section className="studio-card">
        <div className="hero-copy">
          <p className="hero-copy__eyebrow">Topic 27.1</p>
          <h1>Actions waitlist workspace</h1>
          <p className="hero-copy__body">
            Wire the invite form through React 19 Actions, show pending submit state, and add an
            optimistic row before the server confirms the request.
          </p>
        </div>

        <div className="studio-layout">
          <section className="panel panel--form">
            <div className="panel__header">
              <p className="panel__kicker">Invite form</p>
              <h2>Ship a waitlist flow without local pending flags</h2>
            </div>

            <form ref={formRef} action={formAction} className="invite-form" aria-label="Invite form">
              <label className="field">
                <span>Name</span>
                <input name="name" type="text" placeholder="Taylor Brooks" />
              </label>

              <label className="field">
                <span>Work email</span>
                <input name="email" type="email" placeholder="taylor@signalforge.dev" />
              </label>

              <SubmitButton />
            </form>

            <p
              className={formState.status === 'error' ? 'feedback feedback--error' : 'feedback'}
              role={formState.status === 'error' ? 'alert' : 'status'}
            >
              {formState.message || 'Requests are reviewed manually within one business day.'}
            </p>
          </section>

          <section className="panel panel--list">
            <div className="panel__header">
              <p className="panel__kicker">Queue</p>
              <h2>Current invite requests</h2>
            </div>

            <ul className="invite-list" aria-label="Invite queue">
              {optimisticInvites.map((invite) => (
                <li key={invite.id} className="invite-card">
                  <div>
                    <p className="invite-card__name">{invite.name}</p>
                    <p className="invite-card__email">{invite.email}</p>
                  </div>
                  <div className="invite-card__meta">
                    <span
                      className={
                        invite.status === 'sending' ? 'status-badge status-badge--sending' : 'status-badge'
                      }
                    >
                      {invite.status === 'sending' ? 'Sending' : 'Confirmed'}
                    </span>
                    <span className="invite-card__label">{invite.requestedLabel}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
