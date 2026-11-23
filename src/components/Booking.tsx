'use client';
import { useEffect, useRef } from 'react';

// Cal.com inline booking. Loads Cal's embed script only when the calendar scrolls near the screen.
type CalFn = ((...args: unknown[]) => void) & { loaded?: boolean; ns?: Record<string, unknown>; q?: unknown[] };

export function Booking({ calLink }: { calLink: string }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let done = false;
    const load = () => {
      if (done) return;
      done = true;
      const w = window as unknown as { Cal?: CalFn };
      if (!w.Cal) {
        const cal: CalFn = function (...args: unknown[]) {
          if (!cal.loaded) {
            cal.ns = {}; cal.q = cal.q || [];
            const s = document.createElement('script'); s.src = 'https://app.cal.com/embed/embed.js'; document.head.appendChild(s);
            cal.loaded = true;
          }
          (cal.q = cal.q || []).push(args);
        };
        w.Cal = cal;
      }
      w.Cal!('init', { origin: 'https://cal.com' });
      w.Cal!('inline', { elementOrSelector: '#cal-inline', calLink, layout: 'month_view' });
      w.Cal!('ui', { theme: 'dark', cssVarsPerTheme: { dark: { 'cal-brand': '#4c86ff' } }, hideEventTypeDetails: false, layout: 'month_view' });
    };
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { load(); io.disconnect(); } }, { rootMargin: '600px' });
    io.observe(el);
    return () => io.disconnect();
  }, [calLink]);
  return (
    <div className="booking">
      <div className="booking__head">
        <h3 className="voice-auto booking__title">Book a free 15-minute automation audit</h3>
        <p className="muted">Pick a time that suits you. We’ll look at one process in your business and whether it can run on its own.</p>
        <p className="mono muted">Calendar not loading? <a className="link" href={`https://cal.com/${calLink}`} target="_blank" rel="noopener">Open it on Cal.com ↗</a></p>
      </div>
      <div id="cal-inline" ref={box} className="booking__cal" data-lenis-prevent />
    </div>
  );
}
