import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { chapters, menu, hero } from '../../data/story.js';
import { turnPageTo } from '../../lib/scroll.js';

function useActiveChapter() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const mid = window.innerHeight * 0.45;
      let idx = 0;
      chapters.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= mid) idx = i;
      });
      setActive(idx);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return [active, progress];
}

export default function ComicNav() {
  const [active, progress] = useActiveChapter();
  const [open, setOpen] = useState(false);
  const menuBtn = useRef(null);
  const prev = chapters[active - 1];
  const next = chapters[active + 1];

  const go = (id, label) => {
    setOpen(false);
    turnPageTo(id, label);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest('input, textarea, select')) return;
      if (e.key === 'Escape') setOpen(false);
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === 'ArrowRight' && next) go(next.id, `CHAPTER ${next.num}`);
      if (e.key === 'ArrowLeft' && prev) go(prev.id, `CHAPTER ${prev.num}`);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <>
      <header className={`comic-nav ${active > 0 ? 'is-scrolled' : ''}`}>
        <button className="nav-logo" onClick={() => go('cover', 'THE BEGINNING')} aria-label="Back to the cover">
          <span className="nav-logo-name">{hero.name}</span>
          <span className="nav-logo-issue">{hero.issue}</span>
        </button>

        <div className="nav-chapter" aria-live="polite">
          <span className="nav-chapter-num">CH. {chapters[active].num}</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              className="nav-chapter-title"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {chapters[active].title}
            </motion.span>
          </AnimatePresence>
        </div>

        <button
          ref={menuBtn}
          className={`nav-menu-btn ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="comic-menu"
        >
          <span className="nav-menu-book" aria-hidden="true">📖</span>
          <span>{open ? 'CLOSE' : 'MENU'}</span>
        </button>

        <div className="nav-progress" aria-hidden="true">
          <div className="nav-progress-fill" style={{ transform: `scaleX(${progress})` }} />
          {chapters.map((c, i) => (
            <span
              key={c.id}
              className={`nav-progress-dot ${i <= active ? 'done' : ''}`}
              style={{ left: `${(i / (chapters.length - 1)) * 100}%` }}
            />
          ))}
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="menu-backdrop"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.nav
              id="comic-menu"
              className="comic-menu halftone"
              aria-label="Comic book menu"
              style={{ transformPerspective: 1000 }}
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            >
              <p className="menu-heading">TABLE OF CONTENTS</p>
              <ul className="menu-list">
                {menu.map((m, i) => (
                  <motion.li
                    key={m.id}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.08 + i * 0.04 }}
                  >
                    <button className="menu-item" onClick={() => go(m.id, m.label)}>
                      <span className="menu-icon" aria-hidden="true">
                        {m.icon}
                      </span>
                      <span>{m.label}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
              <p className="menu-chapters-heading">CHAPTERS</p>
              <ol className="menu-chapters">
                {chapters.map((c, i) => (
                  <li key={c.id}>
                    <button className={`menu-chapter ${i === active ? 'is-active' : ''}`} onClick={() => go(c.id, `CHAPTER ${c.num}`)}>
                      <b>{c.num}</b> {c.title}
                    </button>
                  </li>
                ))}
              </ol>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <div className="chapter-arrows">
        <AnimatePresence>
          {prev && (
            <motion.button
              key="prev"
              className="nav-btn nav-prev"
              onClick={() => go(prev.id, `CHAPTER ${prev.num}`)}
              initial={{ x: -120 }}
              animate={{ x: 0 }}
              exit={{ x: -120 }}
              whileHover={{ rotate: -3, scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
            >
              <span aria-hidden="true">←</span> <span className="nav-btn-label">PREVIOUS CHAPTER</span>
            </motion.button>
          )}
          {next && (
            <motion.button
              key="next"
              className="nav-btn nav-next"
              onClick={() => go(next.id, `CHAPTER ${next.num}`)}
              initial={{ x: 120 }}
              animate={{ x: 0 }}
              exit={{ x: 120 }}
              whileHover={{ rotate: 3, scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
            >
              <span className="nav-btn-label">NEXT CHAPTER</span> <span aria-hidden="true">→</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
