'use client';
import { useEffect, useRef, useState } from 'react';
import type { Shot } from '@/data/site';

type Item = Shot & { title: string; project: string };

// AI video gallery: hover plays a silent preview (fine pointers), a click opens the clip with sound.
export function Reel({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<Item | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const preview = (e: React.PointerEvent<HTMLButtonElement>, on: boolean) => {
    if (e.pointerType !== 'mouse') return;
    const v = e.currentTarget.querySelector('video');
    if (!v) return;
    if (on) {
      if (!v.src) v.src = v.dataset.src || '';
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  return (
    <>
      <ul className="reel" style={{ padding: 0 }}>
        {items.map((it, i) => (
          <li key={it.src} className={`reel__item${i === 0 ? ' reel__item--big' : ''}`} style={{ listStyle: 'none' }} data-reveal="up" data-delay={String((i % 3) * 0.06)}>
            <button type="button" className="reel__btn" onClick={() => setOpen(it)}
              onPointerEnter={(e) => preview(e, true)} onPointerLeave={(e) => preview(e, false)}>
              <span className="reel__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.src} alt={it.alt} width={it.w} height={it.h} loading="lazy" decoding="async" />
                <video data-src={it.video} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />
                <span className="reel__play" aria-hidden="true">▶</span>
              </span>
              <span className="reel__cap"><span className="reel__t">{it.title}</span><span className="mono muted">Play with sound</span></span>
            </button>
          </li>
        ))}
      </ul>
      <dialog ref={dlg} className="lightbox" data-lenis-prevent aria-label={open ? open.title : 'Video'} onClose={() => setOpen(null)}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(null); }}>
        {open && (
          <div className="lightbox__inner">
            <div className="lightbox__bar">
              <span className="lightbox__t">{open.title}</span>
              <span className="lightbox__links">
                <a className="link mono" href={`/work/${open.project}/`}>Case study →</a>
                <button type="button" className="lightbox__close mono" onClick={() => setOpen(null)}>Close ✕</button>
              </span>
            </div>
            <video key={open.video} src={open.video} poster={open.src} width={open.w} height={open.h} controls autoPlay playsInline aria-label={open.alt} />
          </div>
        )}
      </dialog>
    </>
  );
}
