import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../../lib/scroll.js';

/** Reveals `text` one character at a time once `active` becomes true. */
export default function useTypewriter(text, active, speed = 28, delay = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    if (prefersReducedMotion()) {
      setCount(text.length);
      return undefined;
    }
    let i = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay * 1000);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [active, text, speed, delay]);

  return [text.slice(0, count), text.slice(count)];
}
