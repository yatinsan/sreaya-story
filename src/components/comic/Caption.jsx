import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useTypewriter from './useTypewriter.js';

/** Yellow narrator box. `narrator` prefixes "NARRATOR:", `hand` switches to handwriting. */
export default function Caption({
  children,
  narrator = false,
  hand = false,
  typewriter = false,
  animate = true,
  delay = 0,
  className = '',
  style,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const text = typeof children === 'string' ? children : '';
  const shouldType = typewriter && text.length > 0;
  const [shown, hidden] = useTypewriter(text, shouldType && inView, 32, delay + 0.2);
  const classes = `caption ${narrator ? 'narrator' : ''} ${hand ? 'hand' : ''} ${className}`;

  const body = shouldType ? (
    <span aria-label={text}>
      {shown}
      <span className="ghost" style={{ opacity: 0 }} aria-hidden="true">
        {hidden}
      </span>
    </span>
  ) : (
    children
  );

  if (!animate) {
    return (
      <div ref={ref} className={classes} style={style}>
        {body}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={classes}
      style={style}
      initial={{ opacity: 0, y: -16, rotate: -3 }}
      animate={inView ? { opacity: 1, y: 0, rotate: -1 } : undefined}
      transition={{ type: 'spring', stiffness: 200, damping: 16, delay }}
    >
      {body}
    </motion.div>
  );
}
