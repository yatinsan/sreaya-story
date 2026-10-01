/* Small hand-drawn SVG props. They inherit size from their container. */

export function Bell({ className = '' }) {
  return (
    <svg className={`prop-bell ${className}`} viewBox="0 0 120 130" aria-hidden="true">
      <path d="M60 8 v14" stroke="var(--ink)" strokeWidth="7" strokeLinecap="round" />
      <path
        d="M60 20 C30 20 24 50 24 74 C24 88 16 94 10 100 H110 C104 94 96 88 96 74 C96 50 90 20 60 20 Z"
        fill="var(--yellow)"
        stroke="var(--ink)"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path d="M38 50 C40 38 48 32 56 30" stroke="var(--white)" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="112" r="11" fill="var(--orange)" stroke="var(--ink)" strokeWidth="6" />
      <path d="M2 40 l12 6 M2 70 l14 0 M118 40 l-12 6 M118 70 l-14 0" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function Lightning({ className = '', color = 'var(--yellow)' }) {
  return (
    <svg className={`prop-lightning ${className}`} viewBox="0 0 60 120" aria-hidden="true">
      <path
        d="M36 2 L6 64 H28 L18 118 L56 46 H32 Z"
        fill={color}
        stroke="var(--ink)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Calendar({ label, tone = 'var(--white)' }) {
  return (
    <div className="prop-calendar" style={{ '--tone': tone }}>
      <div className="prop-calendar-rings" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="prop-calendar-head">EXAM</div>
      <div className="prop-calendar-body">{label}</div>
    </div>
  );
}

export function Steam() {
  return (
    <span className="prop-steam" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}
