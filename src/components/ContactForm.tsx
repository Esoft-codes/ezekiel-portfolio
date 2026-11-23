'use client';
import { useState } from 'react';

// Opens the visitor's email app with the message ready to send.
// To receive submissions directly, point onSubmit at a form service (Formspree, Resend, etc.).
export function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="contact__form"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const subject = `Project enquiry from ${f.get('name')}`;
        const body = `${f.get('message')}\n\n${f.get('name')}\n${f.get('from')}`;
        location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSent(true);
      }}
    >
      <div className="field"><label className="mono" htmlFor="cf-name">Your name</label><input id="cf-name" name="name" required autoComplete="name" /></div>
      <div className="field"><label className="mono" htmlFor="cf-from">Your email</label><input id="cf-from" name="from" type="email" required autoComplete="email" /></div>
      <div className="field"><label className="mono" htmlFor="cf-msg">What should we build?</label><textarea id="cf-msg" name="message" required /></div>
      <div>
        <button className="btn btn--solid" type="submit" data-fill>
          <span className="btn__fill" aria-hidden="true" />Send message<span className="btn__arrow" aria-hidden="true">→</span>
        </button>
      </div>
      <p className="form-note mono" aria-live="polite">{sent ? 'Your email app should now be open with the message ready.' : 'Opens your email app with the message filled in.'}</p>
    </form>
  );
}
