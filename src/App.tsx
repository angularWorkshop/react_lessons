import { useState, type ChangeEvent, type FocusEvent, type FormEvent, type ReactElement } from 'react';

type Role = 'student' | 'mentor' | 'admin';

interface RegistrationValues {
  name: string;
  email: string;
  password: string;
  role: Role | '';
}

type RegistrationErrors = Partial<Record<keyof RegistrationValues, string>>;
type RegistrationTouched = Partial<Record<keyof RegistrationValues, boolean>>;
type SubmittedRegistration = Omit<RegistrationValues, 'role'> & { role: Role };

const INITIAL_VALUES: RegistrationValues = {
  name: '',
  email: '',
  password: '',
  role: '',
};

const ROLE_OPTIONS: Array<{ value: Role; label: string }> = [
  { value: 'student', label: 'Student' },
  { value: 'mentor', label: 'Mentor' },
  { value: 'admin', label: 'Admin' },
];

function validateField(name: keyof RegistrationValues, value: RegistrationValues[keyof RegistrationValues]): string {
  switch (name) {
    case 'name':
      return typeof value === 'string' && value.trim().length >= 2
        ? ''
        : 'Name must be at least 2 characters long.';
    case 'email':
      return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ''
        : 'Enter a valid email address.';
    case 'password':
      return typeof value === 'string' && /^(?=.*\d).{8,}$/.test(value)
        ? ''
        : 'Password must be 8+ characters and include a number.';
    case 'role':
      return value ? '' : 'Choose a role before submitting the form.';
    default:
      return '';
  }
}

function validateAll(values: RegistrationValues): RegistrationErrors {
  return {
    name: validateField('name', values.name),
    email: validateField('email', values.email),
    password: validateField('password', values.password),
    role: validateField('role', values.role),
  };
}

function hasErrors(errors: RegistrationErrors): boolean {
  return Object.values(errors).some(Boolean);
}

export function App(): ReactElement {
  const [values, setValues] = useState<RegistrationValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [touched, setTouched] = useState<RegistrationTouched>({});
  const [submittedRegistration, setSubmittedRegistration] = useState<SubmittedRegistration | null>(
    null,
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;
    const fieldName = name as 'name' | 'email' | 'password';

    setValues((currentValues) => {
      const nextValues = {
        ...currentValues,
        [fieldName]: value,
      };

      if (touched[fieldName]) {
        setErrors((currentErrors) => ({
          ...currentErrors,
          [fieldName]: validateField(fieldName, value),
        }));
      }

      return nextValues;
    });
  };

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.currentTarget;

    setValues((currentValues) => {
      const nextRole = value as Role | '';

      if (touched.role) {
        setErrors((currentErrors) => ({
          ...currentErrors,
          role: validateField('role', nextRole),
        }));
      }

      return {
        ...currentValues,
        role: nextRole,
      };
    });
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>): void => {
    const fieldName = event.currentTarget.name as 'name' | 'email' | 'password';
    const fieldValue = event.currentTarget.value;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [fieldName]: true,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: validateField(fieldName, fieldValue),
    }));
  };

  const handleRoleBlur = (event: FocusEvent<HTMLSelectElement>): void => {
    const roleValue = event.currentTarget.value as Role | '';

    setTouched((currentTouched) => ({
      ...currentTouched,
      role: true,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      role: validateField('role', roleValue),
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const nextErrors = validateAll(values);

    setTouched({
      name: true,
      email: true,
      password: true,
      role: true,
    });
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      return;
    }

    setSubmittedRegistration({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      role: values.role as Role,
    });
  };

  return (
    <main className="app-shell">
      <section className="form-shell">
        <div className="form-copy">
          <p className="eyebrow">Topic 11.1</p>
          <h1>Controlled registration form</h1>
          <p className="description">
            Build a fully controlled form with typed change, blur, and submit handlers.
          </p>
          <ul className="feature-list">
            <li>All fields live in React state.</li>
            <li>Validation should run on blur and on submit.</li>
            <li>Every event handler must stay strictly typed.</li>
          </ul>
        </div>

        <form className="signup-card" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Name</span>
            <input
              name="name"
              type="text"
              placeholder="Ada Lovelace"
              value={values.name}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            {touched.name && errors.name ? <small role="alert">{errors.name}</small> : null}
          </label>

          <label className="field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              placeholder="ada@react.dev"
              value={values.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            {touched.email && errors.email ? <small role="alert">{errors.email}</small> : null}
          </label>

          <label className="field">
            <span>Password</span>
            <input
              name="password"
              type="password"
              placeholder="8+ chars with a number"
              value={values.password}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            {touched.password && errors.password ? (
              <small role="alert">{errors.password}</small>
            ) : null}
          </label>

          <label className="field">
            <span>Role</span>
            <select
              name="role"
              value={values.role}
              onChange={handleRoleChange}
              onBlur={handleRoleBlur}
            >
              <option value="">Select a role</option>
              {ROLE_OPTIONS.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            {touched.role && errors.role ? <small role="alert">{errors.role}</small> : null}
          </label>

          <button className="primary-button" type="submit">
            Create account
          </button>
        </form>

        {submittedRegistration ? (
          <article className="success-card" aria-live="polite">
            <p className="eyebrow">Profile ready</p>
            <h2>Ready to onboard</h2>
            <p>The form is valid and the typed submit handler collected every field.</p>
            <ul className="summary-list">
              <li>
                <strong>Name:</strong> {submittedRegistration.name}
              </li>
              <li>
                <strong>Email:</strong> {submittedRegistration.email}
              </li>
              <li>
                <strong>Role:</strong> {submittedRegistration.role}
              </li>
            </ul>
          </article>
        ) : null}
      </section>
    </main>
  );
}
