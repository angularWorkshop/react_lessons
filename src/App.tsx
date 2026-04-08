import { useState, type ReactElement } from 'react';
import { useForm } from 'react-hook-form';

type Role = 'student' | 'mentor' | 'admin';

interface RegistrationValues {
  name: string;
  email: string;
  password: string;
  role: Role | '';
}

const DEFAULT_VALUES: RegistrationValues = {
  name: '',
  email: '',
  password: '',
  role: '',
};

export function App(): ReactElement {
  const [submittedValues, setSubmittedValues] = useState<RegistrationValues | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationValues>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onBlur',
  });

  const onSubmit = (values: RegistrationValues): void => {
    setSubmittedValues(values);
  };

  return (
    <main className="app-shell">
      <section className="form-layout">
        <div className="intro-card">
          <p className="eyebrow">Topic 11.2</p>
          <h1>React Hook Form + Zod</h1>
          <p className="description">
            Rebuild the same signup flow with React Hook Form, schema validation, and inferred
            types.
          </p>
        </div>

        <form className="panel-card" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="field">
            <span>Name</span>
            <input
              type="text"
              placeholder="Ada Lovelace"
              {...register('name', {
                required: 'Please enter your full name.',
                minLength: {
                  value: 2,
                  message: 'Please enter your full name.',
                },
              })}
            />
            {errors.name ? <small role="alert">{errors.name.message}</small> : null}
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              placeholder="ada@react.dev"
              {...register('email', {
                required: 'Please enter your email.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email must be valid.',
                },
              })}
            />
            {errors.email ? <small role="alert">{errors.email.message}</small> : null}
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              placeholder="8+ chars"
              {...register('password', {
                required: 'Please enter a password.',
                minLength: {
                  value: 8,
                  message: 'Password must contain at least 8 characters.',
                },
              })}
            />
            {errors.password ? <small role="alert">{errors.password.message}</small> : null}
          </label>

          <label className="field">
            <span>Role</span>
            <select {...register('role')}>
              <option value="">Select a role</option>
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role ? <small role="alert">{errors.role.message}</small> : null}
          </label>

          <button className="primary-button" type="submit">
            Save with RHF
          </button>
        </form>

        {submittedValues ? (
          <article className="summary-card">
            <p className="eyebrow">Submit payload</p>
            <h2>Form payload is ready</h2>
            <ul className="summary-list">
              <li>
                <strong>Name:</strong> {submittedValues.name}
              </li>
              <li>
                <strong>Email:</strong> {submittedValues.email}
              </li>
              <li>
                <strong>Role:</strong> {submittedValues.role}
              </li>
            </ul>
          </article>
        ) : null}
      </section>
    </main>
  );
}
