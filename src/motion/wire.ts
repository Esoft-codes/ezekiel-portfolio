// The driver: scroll position → where the execution item sits on the wire, which nodes have run.
// One clock (gsap ticker via onScroll + an idle tween), nothing else reads scroll.
import { gsap } from 'gsap';
import { onPage, onScroll, prefersReducedMotion } from '@/engine';

let nodes: { el: HTMLElement; top: number }[] = [];
let startY = 0;
let lit: HTMLElement | null = null;
let pulse: HTMLElement | null = null;

function measure() {
  const y = scrollY;
  nodes = [...document.querySelectorAll<HTMLElement>('[data-node]')].map((el) => {
    const r = el.getBoundingClientRect();
    return { el, top: r.top + y + r.height / 2 };
  });
  startY = nodes[0]?.top ?? 0;
}

function apply(y: number, progress: number) {
  const vh = innerHeight;
  const pulseY = vh * (0.32 + 0.36 * progress); // the item drifts down the viewport as the run completes
  const top = Math.max(0, startY - y);
  const h = Math.max(0, pulseY - top);
  if (lit) gsap.set(lit, { y: top, height: h });
  if (pulse) gsap.set(pulse, { y: Math.max(pulseY, top) });
  for (const n of nodes) n.el.classList.toggle('is-run', n.top - y <= pulseY + 2);
}

export function startWire() {
  lit = document.querySelector('.wire__lit');
  pulse = document.querySelector('.pulse');
  const ring = document.querySelector('.pulse__ring');
  const wire = document.querySelector('.wire');
  if (!prefersReducedMotion()) {
    // idle: data keeps flowing down the wire and the item breathes while nobody scrolls
    if (wire) gsap.fromTo(wire, { backgroundPosition: '0px 0px, 2px 0px' }, { backgroundPosition: '0px 60px, 2px 20px', duration: 2.2, ease: 'none', repeat: -1 });
    if (ring) gsap.fromTo(ring, { scale: 0.6, opacity: 0.8 }, { scale: 1.6, opacity: 0, duration: 1.8, ease: 'power2.out', repeat: -1 });
  }
  let last = { y: 0, p: 0 };
  onScroll(({ y, progress }) => { last = { y, p: progress }; apply(y, progress); });
  onPage(() => {
    measure();
    const max = document.documentElement.scrollHeight - innerHeight;
    apply(scrollY, max > 0 ? scrollY / max : 0);
    const re = () => { measure(); apply(last.y, last.p); };
    addEventListener('resize', re);
    const t = setTimeout(re, 600); // after fonts and images settle
    return () => { removeEventListener('resize', re); clearTimeout(t); nodes = []; };
  });
}
