// Global motion, once on the client before the first page.
import { gsap } from 'gsap';
import { ease, onScroll, setTransition } from '@/engine';
import { buttonFill } from './fill';
import { indexPreview } from './preview';

export function setupMotion() {
  // Page transition: a plain panel wipes across, then reveals the next page.
  setTransition({
    leave: (c) => {
      const panel = c.querySelector('.curtain__panel');
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .set(panel, { clipPath: 'inset(0% 100% 0% 0%)' })
        .to(panel, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: ease.inOut });
    },
    enter: (c) => {
      const panel = c.querySelector('.curtain__panel');
      return gsap.timeline()
        .to(panel, { clipPath: 'inset(0% 0% 0% 100%)', duration: 0.65, ease: ease.inOut }, 0.05)
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

  buttonFill();
  indexPreview();
}
