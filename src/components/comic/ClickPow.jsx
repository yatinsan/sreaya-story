import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const WORDS = ['POW!', 'ZAP!', 'BAM!', 'BOOP!', 'WHAM!', 'POP!', 'KAPOW!', 'ZING!'];
const COLORS = ['var(--yellow)', 'var(--pink)', 'var(--sky)', 'var(--green)', 'var(--orange)'];

/** Clicking anywhere on empty space pops a tiny comic sound effect under the cursor. */
export default function ClickPow() {
  const [pows, setPows] = useState([]);

  useEffect(() => {
    let id = 0;
    const onClick = (e) => {
      if (e.target.closest('button, a, input, textarea, select, label, form, .friend-card, .s7-hobby')) return;
      const pow = {
        id: id++,
        x: e.clientX,
        y: e.clientY,
        word: WORDS[Math.floor(Math.random() * WORDS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rot: Math.random() * 40 - 20,
      };
      setPows((p) => [...p.slice(-6), pow]);
      setTimeout(() => setPows((p) => p.filter((x) => x.id !== pow.id)), 700);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  return (
    <AnimatePresence>
      {pows.map((p) => (
        <motion.span
          key={p.id}
          className="click-pow"
          style={{ left: p.x, top: p.y, color: p.color }}
          initial={{ scale: 0, rotate: p.rot - 30, opacity: 1 }}
          animate={{ scale: 1.2, rotate: p.rot, opacity: 1, y: -20 }}
          exit={{ scale: 0.6, opacity: 0, y: -50 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          {p.word}
        </motion.span>
      ))}
    </AnimatePresence>
  );
}
