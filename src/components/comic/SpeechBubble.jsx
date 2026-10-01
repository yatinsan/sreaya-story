import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Burst from './Burst.jsx';
import useTypewriter from './useTypewriter.js';

/**
 * variant: 'speech' | 'thought' | 'shout'
 * tail: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'left' | 'right' | 'none'
 * animate=false lets a parent (e.g. a GSAP timeline) control the entrance; the text is shown in full.
 */
export default function SpeechBubble({
  children,
  speaker,
  variant = 'speech',
  tail = 'bottom-left',
  className = '',
  delay = 0,
  typewriter = true,
  animate = true,
  burstColor = 'var(--white)',
  style,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const text = typeof children === 'string' ? children : '';
  const shouldType = typewriter && animate && text.length > 0;
  const [shown, hidden] = useTypewriter(text, shouldType && inView, 26, delay + 0.25);

  const classes = [
    'bubble',
    variant !== 'speech' && variant,
    variant === 'speech' && tail !== 'none' && `tail-${tail}`,
    variant === 'thought' && tail.includes('right') && 'flip',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const body = shouldType ? (
    <>
      {shown}
      <span className="ghost" aria-hidden="true">
        {hidden}
      </span>
    </>
  ) : (
    children
  );

  const content = (
    <>
      {variant === 'shout' && <Burst fill={burstColor} spikes={16} seed={text.length + 3} inner={0.8} />}
      {speaker && <span className="bubble-speaker">{speaker}</span>}
      <span aria-label={shouldType ? text : undefined}>{body}</span>
    </>
  );

  if (!animate) {
    return (
      <div ref={ref} className={classes} style={style}>
        {content}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={classes}
      style={style}
      initial={{ opacity: 0, scale: 0.3, rotate: -8 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 14, delay }}
    >
      {content}
    </motion.div>
  );
}
