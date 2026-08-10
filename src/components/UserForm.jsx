import { useState } from 'react';
import Spinner from './Spinner';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm = {
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
  company: '',
};

function toFormState(user) {
  if (!user) return emptyForm;
  return {
    name: user.name || '',
    username: user.username || '',
    email: user.email || '',
    phone: user.phone || '',
    website: user.website || '',
    company: user.company?.name || '',
  };
}


function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Enter a full name.';
  if (!form.username.trim()) errors.username = 'Enter a username.';
  if (!form.email.trim()) {
    errors.email = 'Enter an email address.';
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!form.phone.trim()) errors.phone = 'Enter a phone number.';
  return errors;
}

const inputBase =
  'w-full px-3 py-2.5 text-sm font-body border rounded-sm bg-white text-ink focus:border-teal';
const labelBase =
  'block font-mono text-[11px] tracking-wide uppercase text-ink-soft mb-1.5';


export default function UserForm({ initialUser, onSubmit, onCancel, submitLabel, pendingLabel }) {
  const [form, setForm] = useState(() => toFormState(initialUser));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  function handleChange(field) {
    return (event) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        name: form.name.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        website: form.website.trim(),
        company: { name: form.company.trim() },
      };
      await onSubmit(payload);
    } catch (err) {
      setSubmitError('Something went wrong saving this record. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-card border border-cardline rounded-md shadow-card p-7 max-w-[560px]"
    >
      {submitError && (
        <div
          role="alert"
          className="rounded-sm px-3.5 py-3 text-[13px] mb-4 flex items-start gap-2 bg-brick-light text-brick border border-red-200"
        >
          {submitError}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="name" className={labelBase}>
          Full name
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={handleChange('name')}
          className={`${inputBase} ${errors.name ? 'border-brick' : 'border-cardline'}`}
          aria-invalid={Boolean(errors.name)}
          placeholder="Ada Lovelace"
        />
        {errors.name && <div className="text-brick text-xs mt-1">{errors.name}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="username" className={labelBase}>
          Username
        </label>
        <input
          id="username"
          type="text"
          value={form.username}
          onChange={handleChange('username')}
          className={`${inputBase} ${errors.username ? 'border-brick' : 'border-cardline'}`}
          aria-invalid={Boolean(errors.username)}
          placeholder="ada.lovelace"
        />
        {errors.username && <div className="text-brick text-xs mt-1">{errors.username}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className={labelBase}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          className={`${inputBase} ${errors.email ? 'border-brick' : 'border-cardline'}`}
          aria-invalid={Boolean(errors.email)}
          placeholder="ada@example.com"
        />
        {errors.email && <div className="text-brick text-xs mt-1">{errors.email}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className={labelBase}>
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange('phone')}
          className={`${inputBase} ${errors.phone ? 'border-brick' : 'border-cardline'}`}
          aria-invalid={Boolean(errors.phone)}
          placeholder="555-0100"
        />
        {errors.phone && <div className="text-brick text-xs mt-1">{errors.phone}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="website" className={labelBase}>
          Website (optional)
        </label>
        <input
          id="website"
          type="text"
          value={form.website}
          onChange={handleChange('website')}
          className={`${inputBase} border-cardline`}
          placeholder="ada.dev"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="company" className={labelBase}>
          Company (optional)
        </label>
        <input
          id="company"
          type="text"
          value={form.company}
          onChange={handleChange('company')}
          className={`${inputBase} border-cardline`}
          placeholder="Analytical Engines Ltd."
        />
      </div>

      <div className="flex gap-2.5 mt-1.5">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 font-semibold text-[13px] px-4 py-2.5 rounded-sm bg-brass text-ink hover:bg-brass-dark hover:text-paper transition disabled:opacity-55 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Spinner />
              {pendingLabel}
            </>
          ) : (
            submitLabel
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="font-semibold text-[13px] px-4 py-2.5 rounded-sm border border-ink text-ink hover:bg-ink hover:text-paper transition disabled:opacity-55 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
