const USERS: Record<string, string> = {
  'react-01': 'Ada Lovelace',
  'react-02': 'Grace Hopper',
};

export function HookRulesDemo() {
  const userId = 'react-01';
  const userName = USERS[userId] ?? 'Unknown user';

  return (
    <section>
      <h2>Hooks demo</h2>
      <p>Selected user: {userName}</p>
    </section>
  );
}
