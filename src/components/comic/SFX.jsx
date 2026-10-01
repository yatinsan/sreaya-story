import { motion } from 'framer-motion';
import Burst from './Burst.jsx';

/** Comic sound effect ("POW!", "BOOM!") with an optional starburst background. */
export default function SFX({
  text,
  size = '3rem',
  color = 'var(--yellow)',
  textColor = 'var(--white)',
  rotate = -8,
  burst = true,
  shake = false,
  delay = 0,
  animate = true,
  className = '',
  style,
  spikes = 14,
}) {
  const classes = `sfx ${burst ? '' : 'plain'} ${shake ? 'shake' : ''} ${className}`;
  const inner = (
    <>
      {burst && <Burst fill={color} spikes={spikes} seed={text.length * 3 + spikes} />}
      <span className="sfx-text" style={{ color: textColor }}>
        {text}
      </span>
    </>
  );

  if (!animate) {
    return (
      <div className={classes} style={{ fontSize: size, rotate: `${rotate}deg`, ...style }} aria-hidden="true">
        {inner}
      </div>
    );
  }

  return (
    <motion.div
      className={classes}
      style={{ fontSize: size, ...style }}
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0, rotate: rotate - 40 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: 'spring', stiffness: 320, damping: 12, delay }}
    >
      {inner}
    </motion.div>
  );
}
