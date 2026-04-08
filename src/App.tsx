import { useEffect, useState, type ReactElement } from 'react';

import { createFakeSocket } from './socket';

const SOCKET_URLS = ['wss://alpha.edutec.dev', 'wss://beta.edutec.dev'] as const;

export function App(): ReactElement {
  const [selectedUrl, setSelectedUrl] =
    useState<(typeof SOCKET_URLS)[number]>('wss://alpha.edutec.dev');
  const [messages, setMessages] = useState<string[]>([]);
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const connection = createFakeSocket(selectedUrl, {
      onMessage: (message) => {
        setMessages((currentMessages) => [message, ...currentMessages].slice(0, 4));
      },
    });

    setEvents((currentEvents) => [`connect:${selectedUrl}`, ...currentEvents].slice(0, 6));

    // TODO: reconnect when the URL changes and close the connection in cleanup.
  }, []);

  return (
    <main className="app-shell">
      <div className="hero-card socket-shell">
        <p className="eyebrow">Topic 7.2</p>
        <h1>WebSocket subscription</h1>
        <p className="description">
          Simulate a socket connection and keep the effect lifecycle under control.
        </p>

        <label className="field field--compact">
          <span>Socket URL</span>
          <select
            aria-label="Socket URL"
            value={selectedUrl}
            onChange={(event) =>
              setSelectedUrl(event.target.value as (typeof SOCKET_URLS)[number])
            }
          >
            {SOCKET_URLS.map((url) => (
              <option key={url} value={url}>
                {url}
              </option>
            ))}
          </select>
        </label>

        <div className="socket-grid">
          <section className="socket-card" aria-label="Messages">
            <h2>Messages</h2>
            <ul>
              {messages.length === 0 ? (
                <li>No messages yet.</li>
              ) : (
                messages.map((message) => <li key={message}>{message}</li>)
              )}
            </ul>
          </section>

          <section className="socket-card" aria-label="Lifecycle log">
            <h2>Lifecycle log</h2>
            <ul>
              {events.length === 0 ? (
                <li>No events yet.</li>
              ) : (
                events.map((event) => <li key={event}>{event}</li>)
              )}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
