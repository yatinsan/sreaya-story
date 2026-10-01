import { useEffect, useRef, useState } from 'react';
import { gsap, registerPageTurn } from '../../lib/scroll.js';

/** Full-screen comic page that flips over the viewport while we jump between chapters. */
export default function PageTurn() {
  const pageRef = useRef(null);
  const busy = useRef(false);
  const [label, setLabel] = useState('');

  useEffect(
    () =>
      registerPageTurn((jump, nextLabel = '') => {
        if (busy.current || !pageRef.current) {
          jump();
          return;
        }
        busy.current = true;
        setLabel(nextLabel);
        const page = pageRef.current;

        gsap
          .timeline({
            onComplete: () => {
              busy.current = false;
              gsap.set(page, { visibility: 'hidden' });
            },
          })
          .set(page, { visibility: 'visible', rotateY: -95, transformOrigin: '0% 50%' })
          .to(page, { rotateY: 0, duration: 0.45, ease: 'power3.in' })
          .add(jump)
          .to(page, { duration: 0.25 })
          .set(page, { transformOrigin: '100% 50%' })
          .to(page, { rotateY: 95, duration: 0.5, ease: 'power3.out' });
      }),
    []
  );

  return (
    <div className="page-turn-stage" aria-hidden="true">
      <div ref={pageRef} className="page-turn">
        <div className="page-turn-inner halftone">
          <span className="page-turn-label">{label || 'MEANWHILE...'}</span>
        </div>
      </div>
    </div>
  );
}
