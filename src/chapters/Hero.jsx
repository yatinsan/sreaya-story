import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { hero, images } from '../data/story.js';
import { turnPageTo } from '../lib/scroll.js';
import Cutout from '../components/comic/Cutout.jsx';
import SpeechBubble from '../components/comic/SpeechBubble.jsx';
import SFX from '../components/comic/SFX.jsx';
import Burst from '../components/comic/Burst.jsx';
import Doodles from '../components/comic/Doodles.jsx';

const DOODLES = [
  { type: 'star', top: '14%', left: '4%', size: 46, color: 'var(--yellow)', speed: 1.2, rotate: -12 },
  { type: 'sparkle', top: '70%', left: '6%', size: 38, color: 'var(--white)', speed: 0.8 },
  { type: 'swirl', top: '18%', right: '6%', size: 60, color: 'var(--white)', speed: 1.5 },
  { type: 'heart', bottom: '10%', right: '28%', size: 34, color: 'var(--pink)', speed: 1 },
  { type: 'bolt', top: '58%', right: '4%', size: 54, color: 'var(--yellow)', speed: 1.8, rotate: 14 },
  { type: 'zigzag', bottom: '18%', left: '38%', size: 70, color: 'var(--white)', speed: 0.6 },
];

const QUESTION_POS = [
  { className: 'hq-1', tail: 'bottom-right', depth: 30 },
  { className: 'hq-2', tail: 'bottom-left', depth: -24 },
  { className: 'hq-3', tail: 'top-right', depth: 40 },
];

function TitleLetters({ text }) {
  return (
    <h1 className="hero-title" aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="hero-letter"
          aria-hidden="true"
          initial={{ y: -160, rotate: i % 2 ? 25 : -25, opacity: 0 }}
          animate={{ y: 0, rotate: i % 2 ? 4 : -4, opacity: 1 }}
          whileHover={{ y: -14, rotate: i % 2 ? -8 : 8, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 13, delay: 0.25 + i * 0.07 }}
        >
          {ch}
        </motion.span>
      ))}
    </h1>
  );
}

function FloatingQuestion({ text, className, tail, depth, mx, my, index }) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div className={`hero-question ${className}`} style={{ x, y }}>
      <SpeechBubble variant={index === 2 ? 'shout' : 'speech'} tail={tail} delay={1.4 + index * 0.35} typewriter={false} burstColor="var(--yellow)">
        {text}
      </SpeechBubble>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const charX = useTransform(smx, (v) => v * -18);
  const burstX = useTransform(smx, (v) => v * 12);

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my]);

  return (
    <section id="cover" ref={ref} className="hero">
      <div className="hero-frame">
        <div className="hero-bg" aria-hidden="true">
          {['paper', 'blue', 'red'].map((c) => (
            <div key={c} className={`hero-panel hero-panel-${c}`}>
              <div className={`hero-panel-fill halftone ${c === 'paper' ? '' : 'halftone-light'}`} />
            </div>
          ))}
          <motion.div className="speedlines" style={{ rotate: bgRotate }} />
        </div>

        <Doodles items={DOODLES} />

        <div className="hero-corner">
          <span>{hero.issue}</span>
          <span className="hero-price">{hero.price}</span>
        </div>

        <motion.div className="hero-copy" style={{ y: textY }}>
          <motion.span
            className="hero-kicker"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: -4 }}
            transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 0.1 }}
          >
            COME AND SEE...
          </motion.span>
          <TitleLetters text={hero.name} />
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, type: 'spring', stiffness: 120 }}
          >
            “{hero.tagline}”
          </motion.p>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            {hero.subtitle}
          </motion.p>
          <motion.button
            className="btn-comic red hero-cta"
            onClick={() => turnPageTo('ch-1', 'CHAPTER 01')}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 12 }}
          >
            {hero.cta} <span className="arrow">→</span>
          </motion.button>
        </motion.div>

        <motion.div className="hero-stage" style={{ y: heroY, scale: heroScale }}>
          <motion.div className="hero-burst" aria-hidden="true" style={{ x: burstX }}>
            <Burst spikes={18} fill="var(--yellow)" seed={4} inner={0.78} />
          </motion.div>
          <motion.div
            className="hero-character"
            style={{ x: charX }}
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.6 }}
          >
            <Cutout src={images.heroSchoolbag} alt="Cartoon Sreaya as a school girl with her red school bag" eager idle="bob" />
          </motion.div>
          {hero.questions.map((q, i) => (
            <FloatingQuestion key={q} text={q} index={i} {...QUESTION_POS[i]} mx={smx} my={smy} />
          ))}
          <SFX text="WOW!" size="2.2rem" color="var(--pink)" rotate={12} delay={2.4} className="hero-sfx" />
        </motion.div>

        <motion.div
          className="hero-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 2.5, y: { repeat: Infinity, duration: 1.6 } }}
          aria-hidden="true"
        >
          SCROLL TO READ ↓
        </motion.div>
      </div>
    </section>
  );
}
