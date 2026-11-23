'use client';
import { useEffect, useRef } from 'react';

// Calendly inline booking. Loads Calendly's widget script only when the calendar scrolls near the screen.
type CalendlyApi = { initInlineWidget: (o: { url: string; parentElement: HTMLElement }) => void };

export function Booking({ url }: { url: string }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let done = false;
    const embedUrl = `${url}?hide_gdpr_banner=1&hide_landing_page_details=1&background_color=15171c&text_color=f2f2ee&primary_color=4c86ff`;
    const init = () => {
      const w = window as unknown as { Calendly?: CalendlyApi };
      if (w.Calendly) { el.innerHTML = ''; w.Calendly.initInlineWidget({ url: embedUrl, parentElement: el }); }
    };
    const load = () => {
      if (done) return;
      done = true;
      if ((window as unknown as { Calendly?: CalendlyApi }).Calendly) return init();
      const s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.async = true;
      s.onload = init;
      document.head.appendChild(s);
    };
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { load(); io.disconnect(); } }, { rootMargin: '600px' });
    io.observe(el);
    return () => io.disconnect();
  }, [url]);
  return (
    <div className="booking">
      <div className="booking__head">
        <h3 className="voice-auto booking__title">Book a free 15-minute automation audit</h3>
        <p className="muted">Pick a time that suits you. We’ll look at one process in your business and whether it can run on its own. The call is on Google Meet.</p>
        <p className="mono muted">Calendar not loading? <a className="link" href={url} target="_blank" rel="noopener">Open it on Calendly ↗</a></p>
      </div>
      <div id="booking-cal" ref={box} className="booking__cal" data-lenis-prevent />
    </div>
  );
}
