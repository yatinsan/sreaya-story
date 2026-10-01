import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let pageTurnHandler = null;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Scale factor for horizontal fly-in offsets. Elements must stay partly
 * on-screen in their initial pose or Framer's whileInView never fires.
 */
export const flyInReach = () => (typeof window === 'undefined' ? 1 : Math.min(1, window.innerWidth / 1200));

export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return () => {};

  lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);

  const tick = (time) => lenis && lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    lenis = null;
  };
}

function targetOf(id) {
  if (id === 'top') return 0;
  return document.getElementById(id);
}

export function scrollToId(id, { immediate = false, offset = 0 } = {}) {
  const target = targetOf(id);
  if (target === null) return;
  if (lenis) {
    lenis.scrollTo(target, { immediate, offset, duration: 1.4, force: true });
  } else {
    const top = target === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
  }
}

let refreshTimer = null;

/** Debounced ScrollTrigger.refresh(), e.g. after late-loading images change the layout. */
export function requestRefresh() {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
}

export function registerPageTurn(handler) {
  pageTurnHandler = handler;
  return () => {
    if (pageTurnHandler === handler) pageTurnHandler = null;
  };
}

/** Flip a comic page over the screen, jump to the section underneath, then reveal it. */
export function turnPageTo(id, label) {
  if (pageTurnHandler && !prefersReducedMotion()) {
    pageTurnHandler(() => scrollToId(id, { immediate: true }), label);
  } else {
    scrollToId(id);
  }
}

export { gsap, ScrollTrigger };
