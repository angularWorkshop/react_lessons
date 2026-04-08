import type { ReactElement } from 'react';

const TOPICS: string[] = ['React.createElement', 'props', 'Fragment'];

export function JsxGreeting(): ReactElement {
  return (
    <>
      <h2 className="comparison-title">How JSX maps to React</h2>
      <ul className="comparison-list">
        {TOPICS.map((topic: string) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    </>
  );
}
