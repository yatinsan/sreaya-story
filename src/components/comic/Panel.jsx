import { motion } from 'framer-motion';

const ENTER = {
  left: { x: -90, y: 0 },
  right: { x: 90, y: 0 },
  bottom: { x: 0, y: 90 },
  top: { x: 0, y: -90 },
  zoom: { scale: 0.75 },
  none: {},
};

/**
 * A comic panel: thick outline, hard shadow, optional halftone and tilt.
 * Slides into place when scrolled into view unless `animate={false}`.
 */
export default function Panel({
  as = 'div',
  children,
  className = '',
  tilt = 0,
  from = 'bottom',
  halftone = true,
  bg,
  style,
  delay = 0,
  number,
  animate = true,
  ...rest
}) {
  const classes = `panel ${halftone ? 'halftone' : ''} ${className}`;
  const inner = (
    <>
      {number && <span className="panel-num">{number}</span>}
      {children}
    </>
  );

  if (!animate) {
    const Plain = as;
    const transform = tilt ? `rotate(${tilt}deg)` : undefined;
    return (
      <Plain className={classes} style={{ background: bg, transform, ...style }} {...rest}>
        {inner}
      </Plain>
    );
  }

  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={classes}
      initial={{ opacity: 0, rotate: tilt - 4, ...ENTER[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: tilt }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: 'spring', stiffness: 110, damping: 15, delay }}
      style={{ background: bg, ...style }}
      {...rest}
    >
      {inner}
    </Tag>
  );
}
