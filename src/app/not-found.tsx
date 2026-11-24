import type { Metadata } from 'next';
import { Btn } from '@/components/Btn';

export const metadata: Metadata = { title: 'Page not found', description: 'This page does not exist. Head back to the homepage to see my work.' };

export default function NotFound() {
  return (
    <section className="lost wrap" aria-labelledby="lost-title">
      <p className="err__code voice-auto" aria-hidden="true">404</p>
      <div className="err">
        <h1 id="lost-title" style={{ fontSize: 'var(--t-l)', fontFamily: 'var(--f-body)' }}>This page could not be found.</h1>
        <p className="muted">The link may be old or mistyped. Everything else on the site is where it should be.</p>
      </div>
      <div><Btn href="/">Back to the homepage</Btn></div>
    </section>
  );
}
