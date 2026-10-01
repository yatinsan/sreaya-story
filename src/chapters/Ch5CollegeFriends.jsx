import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { friends, images } from '../data/story.js';
import Cutout from '../components/comic/Cutout.jsx';
import SpeechBubble from '../components/comic/SpeechBubble.jsx';
import SFX from '../components/comic/SFX.jsx';
import Caption from '../components/comic/Caption.jsx';
import Doodles from '../components/comic/Doodles.jsx';

const MAIN = {
  name: 'SREAYA',
  role: 'The main character.',
  line: '"Guys. GUYS. I have a plan."',
  power: 'Turns any day into a story',
  color: 'var(--yellow)',
  image: images.collegeFirstDay,
};

const AREAS = ['f1', 'f2', 'f3', 'f4'];
const TILTS = [-3, 2.5, 2, -2.5];

const DOODLES = [
  { type: 'heart', top: '8%', left: '4%', size: 40, color: 'var(--pink)', speed: 1.2 },
  { type: 'star', top: '12%', right: '5%', size: 46, color: 'var(--yellow)', speed: 1.5 },
  { type: 'zigzag', bottom: '8%', left: '10%', size: 80, color: 'var(--teal)', speed: 0.8 },
  { type: 'sparkle', bottom: '14%', right: '8%', size: 40, color: 'var(--purple)', speed: 1.1 },
];

function FriendCard({ friend, index, area, tilt, active, onHover, onLeave, onToggle, main = false }) {
  const isActive = active === index;
  const dimmed = active !== null && !isActive;

  return (
    <motion.div
      className={`friend-slot ${main ? 'is-main-slot' : ''}`}
      style={{ gridArea: area, zIndex: isActive ? 10 : 1 }}
      initial={{ opacity: 0, y: 80, rotate: tilt * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: 'spring', stiffness: 160, damping: 16, delay: index * 0.08 }}
    >
      <motion.div
        role="button"
        tabIndex={0}
        className={`friend-card panel halftone ${main ? 'is-main' : ''} ${isActive ? 'is-active' : ''}`}
        style={{ '--accent': friend.color }}
        aria-pressed={isActive}
        aria-label={`${friend.name}: ${friend.role}`}
        animate={{
          scale: isActive ? 1.07 : dimmed ? 0.96 : 1,
          rotate: isActive ? [tilt, -tilt - 3, tilt + 3, 0] : tilt,
          filter: dimmed ? 'saturate(0.55)' : 'saturate(1)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={onLeave}
        onClick={() => onToggle(index)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle(index);
          }
        }}
      >
        <span className="friend-name">{friend.name}</span>
        <motion.div className="friend-art" animate={isActive ? { y: [0, -18, 0] } : { y: 0 }} transition={{ duration: 0.5 }}>
          <Cutout src={friend.image} alt="" idle={isActive ? null : 'bob'} />
        </motion.div>
        <span className="friend-role">{friend.role}</span>

        <AnimatePresence>
          {isActive && (
            <motion.div
              key="pop"
              className="friend-pop"
              initial={{ opacity: 0, scale: 0.4, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 10 }}
              transition={{ type: 'spring', stiffness: 340, damping: 18 }}
            >
              <SpeechBubble tail="bottom-left" animate={false}>
                {friend.line}
              </SpeechBubble>
            </motion.div>
          )}
          {isActive && (
            <motion.div
              key="power"
              className="friend-power"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <b>SUPERPOWER:</b> {friend.power}
            </motion.div>
          )}
          {isActive && (
            <motion.span
              key="sfx"
              className="friend-sfx"
              initial={{ scale: 0, rotate: -60 }}
              animate={{ scale: 1, rotate: 12 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 12 }}
            >
              {main ? 'STAR!' : 'HEY!'}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function Ch5CollegeFriends() {
  const [active, setActive] = useState(null);
  const [pinned, setPinned] = useState(false);

  const hover = (i) => !pinned && setActive(i);
  const leave = () => !pinned && setActive(null);
  const toggle = (i) => {
    if (pinned && active === i) {
      setPinned(false);
      setActive(null);
    } else {
      setPinned(true);
      setActive(i);
    }
  };

  const cards = [...friends.map((f, i) => ({ friend: f, area: AREAS[i], tilt: TILTS[i] })), { friend: MAIN, area: 'main', tilt: 0, main: true }];

  return (
    <section id="ch-5" className="chapter ch5">
      <Doodles items={DOODLES} />
      <div className="chapter-inner">
        <header className="title-card s5-title">
          <span className="chapter-tag">CHAPTER 05</span>
          <h2 className="chapter-title">COLLEGE FRIENDS</h2>
          <p className="chapter-sub">The squad. The legends. The group chat that never sleeps.</p>
          <Caption hand className="s5-hint">
            👆 Hover or tap a character to meet them!
          </Caption>
          <SFX text="THE SQUAD!" size="clamp(1.8rem, 4vw, 3rem)" color="var(--pink)" rotate={8} className="s5-squad" />
        </header>

        <div className="s5-page">
          {cards.map((c, i) => (
            <FriendCard
              key={c.friend.name}
              friend={c.friend}
              index={i}
              area={c.area}
              tilt={c.tilt}
              main={c.main}
              active={active}
              onHover={hover}
              onLeave={leave}
              onToggle={toggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
