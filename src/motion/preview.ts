// Execution log: a floating preview of the real build follows the pointer (fine pointers only).
import { gsap } from 'gsap';
import { onPage, onScroll, isTouch } from '@/engine';

export const indexPreview = () => onPage(() => {
  const list = document.querySelector('[data-index]');
  const box = document.querySelector<HTMLElement>('.preview');
  if (!list || !box || isTouch()) return;
  const img = box.querySelector('img')!;
  const type = box.querySelector<HTMLElement>('.preview__type')!;
  const cap = box.querySelector<HTMLElement>('.preview__cap')!;
  const x = gsap.quickTo(box, 'x', { duration: 0.6, ease: 'power3.out' });
  const y = gsap.quickTo(box, 'y', { duration: 0.6, ease: 'power3.out' });
  const rot = gsap.quickTo(box, 'rotate', { duration: 0.8, ease: 'power3.out' });
  let lastX = 0, px = 0, py = 0, moved = false;
  const move = (e: PointerEvent) => {
    moved = true; px = e.clientX; py = e.clientY;
    x(px); y(py); rot(gsap.utils.clamp(-6, 6, (px - lastX) * 0.4)); lastX = px;
  };
  const show = (e: Event) => {
    if (!moved) return; // a row sliding under a still pointer after navigation is not a hover
    const a = e.currentTarget as HTMLElement;
    const src = a.dataset.preview;
    box.style.setProperty('--lane', a.dataset.branch === 'Creative' ? 'var(--c-create)' : 'var(--c-auto)');
    if (src) { img.src = src; img.hidden = false; type.hidden = true; }
    else { img.hidden = true; type.hidden = false; type.textContent = a.dataset.title || ''; }
    cap.textContent = a.dataset.chain || '';
    gsap.to(box, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'expo.out' });
  };
  const hide = () => gsap.to(box, { autoAlpha: 0, scale: 0.9, duration: 0.4, ease: 'expo.out' });
  const links = [...list.querySelectorAll<HTMLAnchorElement>('a[data-title]')];
  links.forEach((a) => a.addEventListener('pointerenter', show));
  list.addEventListener('pointerleave', hide);
  addEventListener('pointermove', move);
  const ps = () => hide();
  addEventListener('pageshow', ps); addEventListener('pagehide', ps);
  const off = onScroll(() => { if (!list.contains(document.elementFromPoint(px, py))) hide(); });
  links.filter((a) => a.dataset.preview).forEach((a) => { const i = new Image(); i.src = a.dataset.preview!; });
  return () => { gsap.killTweensOf(box); gsap.set(box, { autoAlpha: 0 }); removeEventListener('pointermove', move); removeEventListener('pageshow', ps); removeEventListener('pagehide', ps); off(); links.forEach((a) => a.removeEventListener('pointerenter', show)); };
});
