import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '../lib/scroll.js';
import { images, schoolTimeline } from '../data/story.js';
import SpeechBubble from '../components/comic/SpeechBubble.jsx';
import SFX from '../components/comic/SFX.jsx';
import Cutout from '../components/comic/Cutout.jsx';
import Caption from '../components/comic/Caption.jsx';
import { Calendar } from '../components/comic/Props.jsx';

const EXAM_ART = [
  { image: images.heroSchoolbag, alt: 'Sreaya relaxed, giving a peace sign', tone: 'var(--white)' },
  { emoji: '😐', tone: 'var(--yellow-soft)' },
  { image: images.examPanic, alt: 'Sreaya panicking surrounded by books', tone: 'var(--red)' },
];

function StoryCard({ item, index }) {
  return (
    <article className="s2-card panel halftone" style={{ '--accent': item.color }}>
      <header className="s2-card-head">
        <span className="s2-card-num">{String(index + 1).padStart(2, '0')}</span>
        <h3>{item.title}</h3>
      </header>
      <div className="s2-art" style={item.bg ? { backgroundImage: `url(${item.bg})` } : undefined}>
        {item.image ? (
          <Cutout src={item.image} alt={item.title} idle="bob" className="s2-cutout" />
        ) : (
          <motion.span
            className="s2-emoji"
            role="img"
            aria-label={item.title}
            initial={{ scale: 0, rotate: -30 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: 'spring', stiffness: 220, damping: 10 }}
          >
            {item.emoji}
          </motion.span>
        )}
        {item.sfx && <SFX text={item.sfx} size="1.6rem" rotate={index % 2 ? 10 : -10} className="s2-sfx" color="var(--white)" textColor={item.color} delay={0.2} />}
        {item.bubble && (
          <SpeechBubble className="s2-bubble" tail={index % 2 ? 'bottom-right' : 'bottom-left'} delay={0.3}>
            {item.bubble}
          </SpeechBubble>
        )}
      </div>
      <p className="s2-text">{item.text}</p>
    </article>
  );
}

function ExamCard({ item, index }) {
  return (
    <article className="s2-card s2-exam panel" style={{ '--accent': item.color }}>
      <header className="s2-card-head">
        <span className="s2-card-num">{String(index + 1).padStart(2, '0')}</span>
        <h3>{item.title}</h3>
      </header>
      <div className="s2-exam-strip">
        {item.exam.map((step, i) => {
          const art = EXAM_ART[i];
          const last = i === item.exam.length - 1;
          return (
            <motion.div
              key={step.clock}
              className={`s2-exam-panel halftone ${last ? 'is-panic' : ''}`}
              style={{ background: art.tone }}
              initial={{ rotateY: -80, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14, delay: i * 0.15 }}
            >
              <Calendar label={step.clock} tone={last ? 'var(--yellow)' : 'var(--white)'} />
              <div className="s2-exam-art">
                {art.image ? (
                  <Cutout src={art.image} alt={art.alt} idle={last ? null : 'bob'} className={last ? 'shake-hard' : ''} />
                ) : (
                  <span className="s2-emoji s2-exam-emoji" role="img" aria-label="Speechless">
                    {art.emoji}
                    <span className="sweat" aria-hidden="true">💧</span>
                  </span>
                )}
              </div>
              <SpeechBubble className="s2-exam-bubble" speaker="SREAYA" tail="bottom-left" typewriter={!last} delay={0.2 + i * 0.1}>
                {step.line}
              </SpeechBubble>
              {step.sfx && <SFX text={step.sfx} size="clamp(2rem, 4vw, 3rem)" color="var(--yellow)" rotate={-12} shake className="s2-panic" delay={0.4} />}
            </motion.div>
          );
        })}
      </div>
    </article>
  );
}

export default function Ch2Friends() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
      () => {
        const track = trackRef.current;
        const distance = () => track.scrollWidth - window.innerWidth;
        const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.4, ease: 'power3' });
        const clamp = gsap.utils.clamp(-6, 6);

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => skewTo(clamp(self.getVelocity() / -450)),
          },
        });

        gsap.to('.s2-progress-fill', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: pinRef.current, start: 'top top', end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true },
        });
      },
      sectionRef.current
    );
    return () => mm.revert();
  }, []);

  return (
    <section id="ch-2" ref={sectionRef} className="chapter ch2">
      <div className="ch2-pin" ref={pinRef}>
        <div className="ch2-track" ref={trackRef}>
          <header className="s2-intro">
            <span className="chapter-tag">CHAPTER 02</span>
            <h2 className="chapter-title">FRIENDS &amp; MEMORIES</h2>
            <p className="chapter-sub">A completely accurate timeline of school life.</p>
            <Caption hand className="s2-intro-caption">
              Keep scrolling — the comic slides sideways →
            </Caption>
          </header>

          {schoolTimeline.map((item, i) =>
            item.exam ? <ExamCard key={item.id} item={item} index={i} /> : <StoryCard key={item.id} item={item} index={i} />
          )}

          <div className="s2-outro">
            <SFX text="THE END...?" size="clamp(2.4rem, 5vw, 4rem)" color="var(--lilac)" rotate={-6} />
          </div>
        </div>
        <div className="s2-progress" aria-hidden="true">
          <div className="s2-progress-fill" />
        </div>
      </div>
    </section>
  );
}
