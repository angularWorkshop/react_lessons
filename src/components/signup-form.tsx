import { useState, type FormEvent, type ReactElement } from 'react';

interface FormData {
  name: string;
  email: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

interface SignupFormProps {
  onSubmit: (data: FormData) => void;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  if (!data.email.includes('@')) {
    errors.email = 'Please enter a valid email';
  }
  return errors;
}

export function SignupForm({ onSubmit }: SignupFormProps): ReactElement {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data: FormData = { name, email };
    const validationErrors = validate(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    onSubmit(data);
  };

  if (submitted) {
    return <p role="status">Thanks for signing up, {name}!</p>;
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Signup">
      <div>
        <label htmlFor="signup-name">Name</label>
        <input
          id="signup-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p role="alert">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p role="alert">{errors.email}</p>}
      </div>

      <button type="submit">Sign up</button>
    </form>
  );
}
