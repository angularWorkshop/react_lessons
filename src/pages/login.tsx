import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth-store';

export default function LoginPage() {
  const [name, setName] = useState('');
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string } | null)?.from ?? '/board';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim(), 'member');
    navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          aria-label="Name"
        />
        <button type="submit" className="btn-primary" disabled={!name.trim()}>
          Sign In
        </button>
      </form>
    </div>
  );
}
