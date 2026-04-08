import { startTransition, useState, type ReactElement } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const registrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.'),
  email: z.string().trim().email('Please enter a valid work email.'),
  password: z
    .string()
    .regex(/^(?=.*\d).{8,}$/, 'Password must contain at least 8 characters.'),
  role: z.string().min(1, 'Choose the role that matches the account.'),
});

type RegistrationValues = z.infer<typeof registrationSchema>;

const DEFAULT_VALUES: RegistrationValues = {
  name: '',
  email: '',
  password: '',
  role: '',
};

export function App(): ReactElement {
  const [submittedValues, setSubmittedValues] = useState<RegistrationValues | null>(null);
  const registrationForm = useForm<RegistrationValues>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onBlur',
    resolver: zodResolver(registrationSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = registrationForm;

  const onSubmit = (values: RegistrationValues): void => {
    startTransition(() => {
      setSubmittedValues(values);
    });
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
          <article className="summary-card" aria-live="polite">
            <p className="eyebrow">Submit payload</p>
            <h2>Form payload is typed from the schema</h2>
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
