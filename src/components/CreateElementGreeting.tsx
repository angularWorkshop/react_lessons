import * as React from 'react';

const TOPICS: string[] = ['React.createElement', 'props', 'Fragment'];

export function CreateElementGreeting(): React.ReactElement {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('h2', { className: 'comparison-title' }, 'How JSX maps to React'),
    React.createElement(
      'ul',
      { className: 'comparison-list' },
      ...TOPICS.map((topic: string) => React.createElement('li', { key: topic }, topic)),
    ),
  );
}
