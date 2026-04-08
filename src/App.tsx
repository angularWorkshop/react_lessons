import { useState, type ChangeEvent, type ReactElement } from 'react';

interface FormState {
  fullName: string;
  email: string;
  track: string;
  city: string;
}

const INITIAL_FORM: FormState = {
  fullName: 'Mila Fox',
  email: 'mila@example.com',
  track: 'Frontend',
  city: 'Minsk',
};

export function App(): ReactElement {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  const isFormField = (name: string): name is keyof FormState => name in INITIAL_FORM;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = event.target;

    if (!isFormField(name)) {
      return;
    }

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  return (
    <main className="app-shell">
      <div className="hero-card form-shell">
        <p className="eyebrow">Topic 6.2</p>
        <h1>Typed form state</h1>
        <p className="description">
          Keep one typed state object in sync with a profile setup form.
        </p>

        <div className="form-grid">
          <form className="profile-form" aria-label="Profile form">
            <label className="field">
              <span>Full name</span>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </label>

            <label className="field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </label>

            <label className="field">
              <span>Track</span>
              <select name="track" value={form.track} onChange={handleChange}>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Design">Design</option>
              </select>
            </label>

            <label className="field">
              <span>City</span>
              <input name="city" value={form.city} onChange={handleChange} />
            </label>
          </form>

          <aside className="profile-summary" aria-label="Live summary">
            <h2>Live summary</h2>
            <dl>
              <div>
                <dt>Name</dt>
                <dd>{form.fullName}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{form.email}</dd>
              </div>
              <div>
                <dt>Track</dt>
                <dd>{form.track}</dd>
              </div>
              <div>
                <dt>City</dt>
                <dd>{form.city}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </main>
  );
}
