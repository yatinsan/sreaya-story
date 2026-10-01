import confetti from 'canvas-confetti';
import { prefersReducedMotion } from './scroll.js';

const COLORS = ['#ffd60a', '#ff3d3d', '#2f6bff', '#ff5fa2', '#3ddc84', '#ffffff'];

export function burstConfetti({ x = 0.5, y = 0.6, power = 1 } = {}) {
  if (prefersReducedMotion()) return;
  const base = { colors: COLORS, disableForReducedMotion: true, zIndex: 300, scalar: 1.1 };
  confetti({ ...base, particleCount: Math.round(90 * power), spread: 80, startVelocity: 45, origin: { x, y } });
  confetti({ ...base, particleCount: Math.round(40 * power), spread: 120, startVelocity: 30, shapes: ['star'], origin: { x, y } });
}

export function sideCannons() {
  if (prefersReducedMotion()) return;
  const base = { colors: COLORS, zIndex: 300, particleCount: 70, spread: 60, startVelocity: 60 };
  confetti({ ...base, angle: 60, origin: { x: 0, y: 0.8 } });
  confetti({ ...base, angle: 120, origin: { x: 1, y: 0.8 } });
}
