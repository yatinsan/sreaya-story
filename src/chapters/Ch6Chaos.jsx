import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { chaos, memories } from '../data/story.js';
import SFX from '../components/comic/SFX.jsx';
import Polaroid from '../components/comic/Polaroid.jsx';
import { burstConfetti } from '../lib/confetti.js';
import { flyInReach } from '../lib/scroll.js';

const SIDES = [
  { x: -260, y: 0 },
  { x: 260, y: 0 },
  { x: 0, y: 220 },
  { x: -200, y: -160 },
  { x: 200, y: 160 },
];

const SCENE_COLORS = ['var(--yellow)', 'var(--sky)', 'var(--pink)', 'var(--green)', 'var(--orange)', 'var(--lilac)', 'var(--red)', 'var(--teal)', 'var(--white)'];
const SFX_COLORS = ['var(--red)', 'var(--yellow)', 'var(--blue)', 'var(--pink)', 'var(--green)'];

function Marquee({ words, reverse = false, progress }) {
  const x = useTransform(progress, [0, 1], reverse ? ['-30%', '0%'] : ['0%', '-30%']);
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className={`s6-band ${reverse ? 'reverse' : ''}`} aria-hidden="true">
      <motion.div className="s6-band-track" style={{ x }}>
        {row.map((w, i) => (
          <span key={i} className="s6-band-word">
            {w} <i>★</i>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SceneCard({ scene, index }) {
  const side = SIDES[index % SIDES.length];
  const from = { x: side.x * flyInReach(), y: side.y };
  const tilt = ((index * 37) % 9) - 4;
  return (
    <motion.article
      className="s6-scene panel halftone"
      style={{ '--bg': SCENE_COLORS[index % SCENE_COLORS.length] }}
      initial={{ opacity: 0, scale: 0.5, rotate: tilt * 4, ...from }}
      whileInView={{ opacity: 1, scale: 1, rotate: tilt, x: 0, y: 0 }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 5 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: 'spring', stiffness: 170, damping: 13 }}
    >
      <span className="s6-scene-emoji" aria-hidden="true">
        {scene.emoji}
      </span>
      <h3>{scene.title}</h3>
      <p>{scene.line}</p>
    </motion.article>
  );
}

function LetsGo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  useEffect(() => {
    if (!inView) return;
    const r = ref.current.getBoundingClientRect();
    burstConfetti({ x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight, power: 1.2 });
  }, [inView]);
  return (
    <div ref={ref} className="s6-sfx-cell s6-letsgo">
      <SFX text="LET'S GO!" size="clamp(2.4rem, 5vw, 4rem)" color="var(--green)" rotate={-8} spikes={20} />
    </div>
  );
}

export default function Ch6Chaos() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const photos = memories.filter((m) => m.src);

  const items = [];
  chaos.scenes.forEach((scene, i) => {
    items.push(<SceneCard key={scene.title} scene={scene} index={i} />);
    if (i === 1 || i === 3 || i === 5 || i === 7) {
      const s = chaos.sfx[(i - 1) / 2];
      items.push(
        <div key={s} className="s6-sfx-cell">
          <SFX text={s} size="clamp(2rem, 4.4vw, 3.4rem)" color={SFX_COLORS[i % SFX_COLORS.length]} rotate={i % 4 ? 10 : -10} shake={s.includes('?')} spikes={18} />
        </div>
      );
    }
    if (i === 2 && photos[0]) items.push(<Polaroid key="p0" {...photos[0]} from={{ x: -200, y: 60 }} className="s6-photo" />);
    if (i === 6 && photos[1]) items.push(<Polaroid key="p1" {...photos[1]} from={{ x: 200, y: 60 }} className="s6-photo" />);
  });
  items.push(<LetsGo key="letsgo" />);

  return (
    <section id="ch-6" ref={ref} className="chapter ch6">
      <Marquee words={chaos.sfx} progress={scrollYProgress} />
      <div className="chapter-inner">
        <header className="title-card s6-title">
          <span className="chapter-tag">CHAPTER 06</span>
          <motion.h2
            className="chapter-title s6-heading"
            initial={{ scale: 0.4, rotate: -10, opacity: 0 }}
            whileInView={{ scale: 1, rotate: -2, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 10 }}
          >
            {chaos.title}
          </motion.h2>
          <p className="chapter-sub">{chaos.sub}</p>
        </header>
        <div className="s6-grid">{items}</div>
      </div>
      <Marquee words={chaos.sfx} reverse progress={scrollYProgress} />
    </section>
  );
}
