import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/feedback">Leave Feedback</Link>
    </div>
  );
}
