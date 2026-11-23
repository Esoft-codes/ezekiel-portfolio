// Global motion, once on the client before the first page.
import { gsap } from 'gsap';
import { ease, onScroll, setTransition } from '@/engine';
import { startWire } from './wire';
import { buttonFill } from './fill';
import { indexPreview } from './preview';

export function setupMotion() {
  // Remember which link started the run, so the curtain can name the next node.
  let target = '';
  addEventListener('pointerdown', (e) => {
    const a = (e.target as Element).closest('a');
    target = a ? (a.dataset.title || a.querySelector('.nt, .row__t')?.textContent || a.textContent || '').trim() : '';
  }, true);
  addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { const a = document.activeElement?.closest?.('a'); if (a) target = (a.textContent || '').trim(); }
  }, true);

  // Transition: a wire shoots across, the canvas follows it in, then leaves the same way.
  setTransition({
    leave: (c) => {
      const panel = c.querySelector('.curtain__panel');
      const wire = c.querySelector('.curtain__wire');
      const label = c.querySelector<HTMLElement>('.curtain__label');
      if (label) label.innerHTML = '';
      if (label) { label.append('Running next node'); if (target) { const b = document.createElement('b'); b.textContent = ` · ${target.slice(0, 60)}`; label.append(b); } }
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .set(panel, { clipPath: 'inset(0% 100% 0% 0%)' })
        .set(wire, { scaleX: 0, transformOrigin: 'left', autoAlpha: 1 })
        .to(wire, { scaleX: 1, duration: 0.45, ease: ease.inOut })
        .to(panel, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: ease.inOut }, 0.15)
        .fromTo(label, { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, duration: 0.3 }, 0.45);
    },
    enter: (c) => {
      const panel = c.querySelector('.curtain__panel');
      const wire = c.querySelector('.curtain__wire');
      const label = c.querySelector('.curtain__label');
      return gsap.timeline()
        .to(label, { autoAlpha: 0, duration: 0.2 })
        .set(wire, { transformOrigin: 'right' })
        .to(panel, { clipPath: 'inset(0% 0% 0% 100%)', duration: 0.75, ease: ease.inOut }, 0.05)
        .to(wire, { scaleX: 0, duration: 0.55, ease: ease.inOut }, 0.25)
        .set(wire, { autoAlpha: 0 })
        .set(c, { autoAlpha: 0 });
    },
  });

  // The frame steps aside while reading down, returns on the way up.
  let last = 0;
  onScroll(({ y }) => {
    if (Math.abs(y - last) < 4) return;
    document.documentElement.classList.toggle('frame-away', y > 160 && y > last);
    last = y;
  });

  startWire();
  buttonFill();
  indexPreview();
}
