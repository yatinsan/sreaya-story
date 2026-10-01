import { useMemo } from 'react';

function seeded(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/** Jagged starburst polygon used behind shouts and sound effects. */
export default function Burst({ spikes = 14, fill = 'var(--yellow)', stroke = 'var(--ink)', seed = 7, inner = 0.72 }) {
  const points = useMemo(() => {
    const rand = seeded(seed * 9973 + spikes);
    const pts = [];
    const total = spikes * 2;
    for (let i = 0; i < total; i++) {
      const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
      const r = i % 2 === 0 ? 50 : 50 * (inner + (rand() - 0.5) * 0.18);
      const jitter = i % 2 === 0 ? 1 + (rand() - 0.5) * 0.12 : 1;
      pts.push(`${(50 + Math.cos(angle) * r * jitter).toFixed(2)},${(50 + Math.sin(angle) * r * jitter).toFixed(2)}`);
    }
    return pts.join(' ');
  }, [spikes, seed, inner]);

  return (
    <svg className="burst-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <polygon points={points} fill={fill} stroke={stroke} strokeWidth="3" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
