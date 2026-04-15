import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/board" className="btn-primary">Go to Board</Link>
    </div>
  );
}
