import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { college, friends, images } from '../data/story.js';
import Panel from '../components/comic/Panel.jsx';
import SpeechBubble from '../components/comic/SpeechBubble.jsx';
import Caption from '../components/comic/Caption.jsx';
import SFX from '../components/comic/SFX.jsx';
import Cutout from '../components/comic/Cutout.jsx';
import Doodles from '../components/comic/Doodles.jsx';
import { Lightning, Steam } from '../components/comic/Props.jsx';

const FOOD = [
  { e: '🍵', top: '18%', left: '8%', d: 0 },
  { e: '🥟', top: '6%', left: '28%', d: 0.6, desktopOnly: true },
  { e: '🍩', top: '26%', right: '10%', d: 1.1 },
  { e: '🥤', top: '50%', left: '4%', d: 0.3 },
  { e: '🍛', top: '8%', right: '30%', d: 0.9, desktopOnly: true },
  { e: '🍌', top: '46%', right: '4%', d: 1.4 },
];

const DOODLES = [
  { type: 'star', top: '4%', right: '6%', size: 44, color: 'var(--yellow)', speed: 1.3 },
  { type: 'swirl', top: '38%', left: '2%', size: 60, color: 'var(--lilac)', speed: 1 },
  { type: 'sparkle', top: '62%', right: '3%', size: 40, color: 'var(--teal)', speed: 1.6 },
  { type: 'heart', bottom: '4%', left: '6%', size: 36, color: 'var(--pink)', speed: 0.8 },
];

function CountUp({ to, prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    const ctrl = animate(0, to, { duration: 1.8, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => ctrl.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {n}
    </span>
  );
}

function BusRide() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const busX = useTransform(scrollYProgress, [0.1, 0.9], ['-60%', '120%']);
  const hillsFar = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const hillsNear = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const roadX = useTransform(scrollYProgress, [0, 1], ['0px', '-600px']);

  return (
    <Panel className="s4-bus" from="left" halftone={false} number="BUS">
      <div ref={ref} className="s4-bus-scene">
        <div className="s4-sky" aria-hidden="true" />
        <motion.div className="s4-hills far" style={{ x: hillsFar }} aria-hidden="true" />
        <motion.div className="s4-hills near" style={{ x: hillsNear }} aria-hidden="true" />
        <motion.div className="s4-road" style={{ backgroundPositionX: roadX }} aria-hidden="true" />
        <motion.div className="s4-bus-vehicle" style={{ x: busX }}>
          <Cutout src={images.bus} alt="Cartoon Kerala bus full of waving students" idle="bob" />
        </motion.div>
        <Caption className="s4-bus-caption">{college.busLine}</Caption>
        <SFX text="VROOOM!" size="clamp(1.6rem, 3vw, 2.4rem)" color="var(--orange)" rotate={-8} className="s4-vroom" />
      </div>
    </Panel>
  );
}

function AssignmentScene() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const stackScale = useTransform(scrollYProgress, [0.15, 0.65], [0.82, 1.08]);

  return (
    <Panel className="s4-assign" from="zoom" bg="var(--purple)" halftone>
      <div ref={ref} className="s4-assign-inner">
        <div className="s4-flash" aria-hidden="true" />
        <div className="s4-bolt b1">
          <Lightning />
        </div>
        <div className="s4-bolt b2">
          <Lightning color="var(--white)" />
        </div>
        <div className="s4-bolt b3">
          <Lightning />
        </div>
        <motion.div className="s4-assign-art" style={{ scale: stackScale }}>
          <Cutout src={images.assignments} alt="Sreaya staring at an enormous stack of assignments" idle={null} />
        </motion.div>
        <SpeechBubble className="s4-assign-bubble" variant="shout" burstColor="var(--white)">
          {college.assignments.line}
        </SpeechBubble>
        <div className="s4-counter">
          ASSIGNMENTS DUE: <CountUp to={47} />
        </div>
        <SFX text="KRA-KOOM!" size="clamp(1.8rem, 3.6vw, 3rem)" color="var(--yellow)" rotate={10} className="s4-krakoom" shake delay={0.3} />
        {['📄', '📝', '📄', '📃', '📝'].map((p, i) => (
          <span key={i} className="s4-paper" style={{ left: `${10 + i * 18}%`, animationDelay: `${i * 0.7}s` }} aria-hidden="true">
            {p}
          </span>
        ))}
      </div>
    </Panel>
  );
}

export default function Ch4College() {
  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: titleRef, offset: ['start end', 'end start'] });
  const collegeScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const collegeY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const hungryFriend = friends[1];

  return (
    <section id="ch-4" className="chapter ch4">
      <Doodles items={DOODLES} />
      <div className="chapter-inner">
        <header className="title-card s4-title" ref={titleRef}>
          <div className="s4-cover panel">
            <motion.img src={images.college} alt="Idukki College" style={{ scale: collegeScale, y: collegeY }} loading="lazy" />
            <div className="s4-cover-text">
              <span className="chapter-tag">CHAPTER 04 · A NEW UNIVERSE</span>
              <h2 className="chapter-title">{college.name}</h2>
              <p className="chapter-sub">{college.sub}</p>
            </div>
            <SFX text="WHOA!" size="clamp(1.8rem, 4vw, 3rem)" color="var(--teal)" rotate={-12} className="s4-whoa" delay={0.3} />
          </div>
        </header>

        <BusRide />

        <h3 className="s4-heading">COLLEGE LIFE</h3>
        <div className="s4-before-after">
          <Panel className="s4-firstday" from="left" tilt={-1.5} bg="var(--teal)" number="1">
            <span className="s4-label">{college.firstDay.label}</span>
            <div className="s4-firstday-art">
              <Cutout src={images.collegeFirstDay} alt="Sreaya on her first day of college, giving a thumbs up" idle="bob" />
            </div>
            <SpeechBubble className="s4-firstday-bubble" speaker="SREAYA" tail="bottom-left" delay={0.3}>
              {college.firstDay.line}
            </SpeechBubble>
            <SFX text="✨ NEW ME ✨" size="1.4rem" color="var(--yellow)" rotate={8} className="s4-newme" delay={0.6} />
          </Panel>

          <Panel className="s4-weeks" from="right" tilt={1.5} bg="var(--lilac)" number="2">
            <Caption className="s4-weeks-label" hand>
              {college.weeksLater.label}
            </Caption>
            <div className="s4-sleep-art">
              <Cutout src={images.sleepingClass} alt="Sreaya asleep on her desk in class" idle={null} />
              <span className="s4-zzz z1" aria-hidden="true">Z</span>
              <span className="s4-zzz z2" aria-hidden="true">z</span>
              <span className="s4-zzz z3" aria-hidden="true">Z</span>
            </div>
            <Caption className="s4-weeks-narrator" narrator typewriter delay={0.4}>
              {college.weeksLater.narrator}
            </Caption>
          </Panel>
        </div>

        <h3 className="s4-heading">THE CANTEEN</h3>
        <Panel className="s4-canteen" from="bottom" halftone={false}>
          <div className="s4-canteen-wall" aria-hidden="true">
            <div className="s4-menu-board">
              <b>TODAY’S MENU</b>
              <span>Chai ........ ₹10</span>
              <span>Samosa ...... ₹15</span>
              <span>Parotta ..... ₹20</span>
              <span>Studying .... SOLD OUT</span>
            </div>
          </div>
          <div className="s4-table" aria-hidden="true" />
          {FOOD.map((f, i) => (
            <motion.span
              key={i}
              className={`s4-food ${f.desktopOnly ? 'is-desktop-only' : ''}`}
              style={{ top: f.top, left: f.left, right: f.right }}
              initial={{ scale: 0, rotate: -40 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 10, delay: f.d * 0.3 }}
              aria-hidden="true"
            >
              <span style={{ animationDelay: `${f.d}s` }}>{f.e}</span>
            </motion.span>
          ))}
          <div className="s4-canteen-sreaya">
            <Cutout src={images.canteen} alt="Sreaya laughing with chai and a samosa in the canteen" idle="bob" />
            <Steam />
          </div>
          <div className="s4-canteen-friend">
            <Cutout src={hungryFriend.image} alt="A hungry friend eating" idle="sway" />
          </div>
          <SpeechBubble className="s4-friend-bubble" speaker="FRIEND" tail="bottom-right" delay={0.2}>
            {college.canteen.friend}
          </SpeechBubble>
          <SpeechBubble className="s4-sreaya-bubble" speaker="SREAYA" tail="bottom-left" delay={1.2}>
            {college.canteen.sreaya}
          </SpeechBubble>
          <motion.div
            className="s4-stamp"
            initial={{ scale: 2.4, opacity: 0, rotate: -30 }}
            whileInView={{ scale: 1, opacity: 1, rotate: -8 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 2 }}
          >
            {college.canteen.caption}
          </motion.div>
        </Panel>

        <h3 className="s4-heading">THE ASSIGNMENTS</h3>
        <AssignmentScene />
      </div>
    </section>
  );
}
