import { motion } from 'framer-motion';
import { flyInReach } from '../../lib/scroll.js';

/** Taped photo. Pass `src` for a real photo, or `emoji` + `color` for a placeholder. */
export default function Polaroid({ src, emoji, color = 'var(--sky)', caption, tilt = 0, from = { x: 0, y: 80 }, delay = 0, className = '' }) {
  return (
    <motion.figure
      className={`polaroid ${className}`}
      initial={{ opacity: 0, rotate: tilt * 4, scale: 0.6, x: (from.x ?? 0) * flyInReach(), y: from.y ?? 0 }}
      whileInView={{ opacity: 1, rotate: tilt, scale: 1, x: 0, y: 0 }}
      whileHover={{ rotate: 0, scale: 1.06, zIndex: 20 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: 'spring', stiffness: 140, damping: 14, delay }}
    >
      <span className="tape" aria-hidden="true" />
      <div className="polaroid-photo" style={{ background: src ? undefined : color }}>
        {src ? (
          <img src={src} alt={caption} loading="lazy" decoding="async" />
        ) : (
          <span className="polaroid-emoji" role="img" aria-label={caption}>
            {emoji}
          </span>
        )}
        {!src && <span className="polaroid-placeholder">Your photo here</span>}
      </div>
      <figcaption>{caption}</figcaption>
    </motion.figure>
  );
}
