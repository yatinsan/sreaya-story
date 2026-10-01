import { forwardRef, useState } from 'react';
import { requestRefresh } from '../../lib/scroll.js';

/**
 * Character cutout (transparent PNG/WebP with a baked white sticker border).
 * Falls back to a comic silhouette card if the image is missing.
 */
const Cutout = forwardRef(function Cutout({ src, alt, className = '', idle = 'bob', style, eager = false }, ref) {
  const [failed, setFailed] = useState(false);

  return (
    <div ref={ref} className={`cutout ${idle ?? ''} ${className}`} style={style}>
      {failed ? (
        <div className="cutout-fallback" role="img" aria-label={alt}>
          <span>{alt}</span>
        </div>
      ) : (
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable="false" onLoad={requestRefresh} onError={() => setFailed(true)} />
      )}
    </div>
  );
});

export default Cutout;
