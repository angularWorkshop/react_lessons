import { useState, type ReactElement } from 'react';

import { AsyncView } from './components/AsyncView';

interface LessonCard {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate';
}

type IdleState = { status: 'idle' };
type LoadingState = { status: 'loading' };
type SuccessState<T> = { status: 'success'; data: T };
type ErrorState = { status: 'error'; message: string };

export type AsyncState<T> = IdleState | LoadingState | SuccessState<T> | ErrorState;

const LESSONS: LessonCard[] = [
  { id: 'state', title: 'State Machines in UI', level: 'Intermediate' },
  { id: 'keys', title: 'Keys and Reconciliation', level: 'Beginner' },
];

export function App(): ReactElement {
  const [state, setState] = useState<AsyncState<LessonCard[]>>({ status: 'idle' });

  return (
    <main className="app-shell">
      <div className="hero-card async-shell">
        <p className="eyebrow">Topic 10.1</p>
        <h1>Async view component</h1>
        <p className="description">
          Switch between loading, error, and success UI through a typed async state.
        </p>

        <div className="async-actions">
          <button type="button" onClick={() => setState({ status: 'idle' })}>
            Show idle
          </button>
          <button type="button" onClick={() => setState({ status: 'loading' })}>
            Show loading
          </button>
          <button
            type="button"
            onClick={() => setState({ status: 'success', data: LESSONS })}
          >
            Show data
          </button>
          <button
            type="button"
            onClick={() =>
              setState({ status: 'error', message: 'Failed to load recommended lessons.' })
            }
          >
            Show error
          </button>
        </div>

        <AsyncView
          state={state}
          onRetry={() => setState({ status: 'loading' })}
          renderData={(lessons) => (
            <ul className="lesson-list">
              {lessons.map((lesson) => (
                <li key={lesson.id}>
                  <strong>{lesson.title}</strong>
                  <span>{lesson.level}</span>
                </li>
              ))}
            </ul>
          )}
        />
      </div>
    </main>
  );
}
