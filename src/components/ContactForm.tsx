'use client';
import { useState } from 'react';

type State = 'idle' | 'sending' | 'sent' | 'error';

// Sends to your n8n or Make webhook when `webhook` is set (form-encoded, so no CORS setup is needed).
// Without a webhook it falls back to opening the visitor's email app.
export function ContactForm({ email, webhook }: { email: string; webhook?: string }) {
  const [state, setState] = useState<State>('idle');
  return (
    <form
      className="contact__form"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const f = new FormData(form);
        if (f.get('company_site')) return; // spam trap: humans never fill this hidden field
        if (!webhook) {
          const subject = `Project enquiry from ${f.get('name')}`;
          const body = `${f.get('message')}\n\n${f.get('name')}\n${f.get('from')}`;
          location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          setState('sent');
          return;
        }
        setState('sending');
        try {
          const data = new URLSearchParams({
            name: String(f.get('name') || ''),
            email: String(f.get('from') || ''),
            message: String(f.get('message') || ''),
            page: location.href,
            sent_at: new Date().toISOString(),
          });
          await fetch(webhook, { method: 'POST', mode: 'no-cors', body: data });
          setState('sent');
          form.reset();
        } catch {
          setState('error');
        }
      }}
    >
      <div className="field"><label className="mono" htmlFor="cf-name">Your name</label><input id="cf-name" name="name" required autoComplete="name" /></div>
      <div className="field"><label className="mono" htmlFor="cf-from">Your email</label><input id="cf-from" name="from" type="email" required autoComplete="email" /></div>
      <div className="field"><label className="mono" htmlFor="cf-msg">What should we build?</label><textarea id="cf-msg" name="message" required /></div>
      <div className="trap" aria-hidden="true"><label htmlFor="cf-site">Leave this empty</label><input id="cf-site" name="company_site" tabIndex={-1} autoComplete="off" /></div>
      <div>
        <button className="btn btn--solid" type="submit" data-fill disabled={state === 'sending'}>
          <span className="btn__fill" aria-hidden="true" />{state === 'sending' ? 'Sending…' : 'Send message'}<span className="btn__arrow" aria-hidden="true">→</span>
        </button>
      </div>
      <p className="form-note mono" aria-live="polite">
        {state === 'sent' && (webhook ? 'Message received. I’ll reply within one working day.' : 'Your email app should now be open with the message ready.')}
        {state === 'error' && `That didn’t send. Please email me directly at ${email}.`}
        {(state === 'idle' || state === 'sending') && (webhook ? 'I reply within one working day.' : 'Opens your email app with the message filled in.')}
      </p>
    </form>
  );
}
