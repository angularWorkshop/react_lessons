import { useReducer, type ReactElement } from 'react';

import { INITIAL_STATE, machineReducer } from './machineReducer';

export function App(): ReactElement {
  const [state, dispatch] = useReducer(machineReducer, INITIAL_STATE);

  return (
    <main className="app-shell">
      <section className="machine-shell">
        <p className="eyebrow">Topic 12.2</p>
        <h1>Reducer state machine</h1>
        <p className="description">
          Model async loading as explicit states and reducer transitions.
        </p>

        <article className="machine-card">
          <p className="status-badge">Current status: {state.status}</p>

          {state.status === 'idle' ? (
            <div className="state-panel">
              <h2>Idle</h2>
              <p>No request has started yet.</p>
              <button type="button" onClick={() => dispatch({ type: 'START' })}>
                Start loading
              </button>
            </div>
          ) : null}

          {state.status === 'loading' ? (
            <div className="state-panel">
              <h2>Loading</h2>
              <p>Choose whether the request resolves or fails.</p>
              <div className="machine-actions">
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'RESOLVE', data: ['React Docs', 'Reducer Patterns'] })}
                >
                  Resolve request
                </button>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'REJECT',
                      message: 'Network timeout while loading resources.',
                    })
                  }
                >
                  Reject request
                </button>
              </div>
            </div>
          ) : null}

          {state.status === 'success' ? (
            <div className="state-panel">
              <h2>Success</h2>
              <ul className="resource-list">
                {state.data.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button type="button" onClick={() => dispatch({ type: 'RESET' })}>
                Reset machine
              </button>
            </div>
          ) : null}

          {state.status === 'error' ? (
            <div className="state-panel">
              <h2>Error</h2>
              <p>{state.message}</p>
              <div className="machine-actions">
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'RESOLVE', data: ['Recovered without reset'] })}
                >
                  Resolve anyway
                </button>
                <button type="button" onClick={() => dispatch({ type: 'RESET' })}>
                  Reset machine
                </button>
              </div>
            </div>
          ) : null}
        </article>
      </section>
    </main>
  );
}
