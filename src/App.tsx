import { useState, type ReactElement } from 'react';

import { Button } from './components/button';
import { SignupForm } from './components/signup-form';

export function App(): ReactElement {
  const [clicks, setClicks] = useState(0);

  return (
    <main className="app-shell">
      <section className="workspace">
        <p className="workspace__eyebrow">Topic 25.1</p>
        <h1>Testing workspace</h1>
        <p className="workspace__description">
          Button and SignupForm components to practice RTL testing.
        </p>

        <div className="demo-area">
          <div className="demo-block">
            <h2>Button</h2>
            <p>Clicked: {clicks}</p>
            <Button label="Click me" onClick={() => setClicks((c) => c + 1)} />
            <Button label="Disabled" onClick={() => undefined} disabled />
            <Button label="Delete" onClick={() => undefined} variant="danger" />
          </div>

          <div className="demo-block">
            <h2>Signup form</h2>
            <SignupForm onSubmit={(data) => console.log('Submitted:', data)} />
          </div>
        </div>
      </section>
    </main>
  );
}
