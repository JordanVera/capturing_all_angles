'use client';

import { FormEvent, useState } from 'react';
import { PROJECT_TYPES, SERVICES } from '@/lib/site';

const FORM_ACTION = 'https://formsubmit.co/verawebdev@protonmail.com';
const FORM_AJAX = 'https://formsubmit.co/ajax/verawebdev@protonmail.com';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function BookingForm() {
  const [service, setService] =
    useState<(typeof SERVICES)[number]['id']>('both');
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(FORM_AJAX, {
        method: 'POST',
        body: new FormData(event.currentTarget),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error('FormSubmit rejected the request');
      }

      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex min-h-[50vh] flex-col justify-center gap-6">
        <p className="t-nav text-accent">request received</p>
        <p className="max-w-md font-mono text-[1.4rem] leading-[1.4] text-foreground uppercase">
          Thank you. We will write back within two days to lock the date,
          location, and coverage.
        </p>
      </div>
    );
  }

  return (
    <form
      action={FORM_ACTION}
      method="POST"
      onSubmit={onSubmit}
      className="flex flex-col gap-10"
    >
      <input
        type="hidden"
        name="_subject"
        value="New booking request — All Angles"
      />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <fieldset className="grid gap-3 md:grid-cols-3">
        <legend className="t-small mb-4 text-muted">coverage</legend>
        {SERVICES.map((item) => {
          const active = service === item.id;
          return (
            <label
              key={item.id}
              data-hover-sound
              className={`cursor-pointer border px-5 py-5 transition-colors duration-300 ${
                active
                  ? 'border-accent text-accent'
                  : 'border-white/20 text-foreground hover:border-accent hover:text-accent'
              }`}
            >
              <input
                type="radio"
                name="service"
                value={item.id}
                checked={active}
                onChange={() => setService(item.id)}
                className="sr-only"
              />
              <span className="t-nav block">{item.label}</span>
              <span className="t-small mt-2 block text-muted">{item.hint}</span>
            </label>
          );
        })}
      </fieldset>

      <div className="grid gap-8 md:grid-cols-2">
        <Field label="name" name="name" autoComplete="name" required />
        <Field
          label="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <Field label="phone" name="phone" type="tel" autoComplete="tel" />
        <Field label="location" name="location" required />
        <label className="flex flex-col gap-2">
          <span className="t-small text-muted">project</span>
          <select
            name="project"
            required
            defaultValue=""
            className="field-input appearance-none bg-transparent"
          >
            <option value="" disabled>
              select
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-black">
                {type}
              </option>
            ))}
          </select>
        </label>
        <Field label="preferred date" name="date" type="date" />
      </div>

      <label className="flex flex-col gap-2">
        <span className="t-small text-muted">note</span>
        <textarea
          name="note"
          rows={4}
          placeholder="what should we capture"
          className="field-input resize-none bg-transparent placeholder:text-muted/50"
        />
      </label>

      {status === 'error' ? (
        <p className="t-small text-accent">
          Something went wrong. Please try again, or email
          capturingallangles@gmail.com.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="t-nav self-start text-foreground transition-colors duration-300 hover:text-accent disabled:cursor-wait disabled:opacity-50"
      >
        {status === 'sending' ? 'sending…' : 'send request'}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="t-small text-muted">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="field-input bg-transparent"
      />
    </label>
  );
}
