import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PATHS = {
  star: 'M50 6 L61 38 L95 38 L67 58 L78 92 L50 71 L22 92 L33 58 L5 38 L39 38 Z',
  sparkle: 'M50 4 C54 38 62 46 96 50 C62 54 54 62 50 96 C46 62 38 54 4 50 C38 46 46 38 50 4 Z',
  heart: 'M50 88 C20 66 6 48 10 30 C14 12 38 8 50 28 C62 8 86 12 90 30 C94 48 80 66 50 88 Z',
  swirl: 'M50 50 m-4 0 a4 4 0 1 1 8 0 a10 10 0 1 1 -20 0 a18 18 0 1 1 36 0 a26 26 0 1 1 -52 0 a34 34 0 1 1 68 0',
  arrow: 'M8 70 C30 30 60 26 86 40 M86 40 L70 28 M86 40 L72 56',
  zigzag: 'M4 60 L20 36 L36 60 L52 36 L68 60 L84 36 L96 52',
  bolt: 'M58 4 L22 54 L46 54 L36 96 L80 40 L54 40 Z',
  circle: 'M50 10 A40 40 0 1 1 49.9 10',
  squiggle: 'M4 50 C16 20 28 80 40 50 C52 20 64 80 76 50 C84 32 92 40 96 50',
};

const FILLED = new Set(['star', 'sparkle', 'heart', 'bolt']);

function Doodle({ type, top, left, right, bottom, size = 40, color = 'var(--ink)', speed = 1, rotate = 0, progress, float = true }) {
  const y = useTransform(progress, [0, 1], [speed * 80, speed * -80]);
  const filled = FILLED.has(type);

  return (
    <motion.svg
      className="doodle"
      viewBox="0 0 100 100"
      style={{ top, left, right, bottom, width: size, height: size, y, '--r': `${rotate}deg` }}
      aria-hidden="true"
    >
      <motion.g style={{ transformOrigin: '50% 50%', animation: float ? `float ${4 + speed}s ease-in-out infinite` : 'none' }}>
        <motion.path
          d={PATHS[type]}
          fill={filled ? color : 'none'}
          stroke="var(--ink)"
          strokeWidth={filled ? 5 : 6}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          style={filled ? undefined : { stroke: color }}
        />
      </motion.g>
    </motion.svg>
  );
}

/** Floating hand-drawn doodles that draw themselves in and drift with parallax. */
export default function Doodles({ items = [] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <div ref={ref} className="doodles" aria-hidden="true">
      {items.map((d, i) => (
        <Doodle key={i} {...d} progress={scrollYProgress} />
      ))}
    </div>
  );
}
