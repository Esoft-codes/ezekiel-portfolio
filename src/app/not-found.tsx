import type { Metadata } from 'next';
import { Btn } from '@/components/Btn';

export const metadata: Metadata = { title: 'Page not found', description: 'This page does not exist. The workflow stopped at an HTTP request with no endpoint.' };

export default function NotFound() {
  return (
    <section className="lost wrap" aria-labelledby="lost-title">
      <p className="err__code voice-auto" aria-hidden="true">404</p>
      <div className="err mono">
        <p className="err__title">Problem in node ‘HTTP Request’</p>
        <h1 id="lost-title" style={{ fontSize: 'var(--t-m)', fontFamily: 'var(--f-body)' }}>The resource you are requesting could not be found.</h1>
        <p className="muted">There is no page at this address. The rest of the workflow is fine.</p>
      </div>
      <div><Btn href="/">Run again from the start</Btn></div>
    </section>
  );
}
