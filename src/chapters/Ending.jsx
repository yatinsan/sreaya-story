import { motion } from 'framer-motion';
import { ending, images } from '../data/story.js';
import { flyInReach, turnPageTo } from '../lib/scroll.js';
import { burstConfetti, sideCannons } from '../lib/confetti.js';
import Cutout from '../components/comic/Cutout.jsx';
import Caption from '../components/comic/Caption.jsx';
import Doodles from '../components/comic/Doodles.jsx';

const DOODLES = [
  { type: 'star', top: '12%', left: '8%', size: 44, color: 'var(--yellow)', speed: 1.4 },
  { type: 'sparkle', top: '20%', right: '10%', size: 40, color: 'var(--white)', speed: 1 },
  { type: 'star', bottom: '24%', left: '14%', size: 30, color: 'var(--pink)', speed: 1.8 },
  { type: 'sparkle', bottom: '30%', right: '16%', size: 34, color: 'var(--yellow)', speed: 1.2 },
  { type: 'heart', top: '40%', left: '3%', size: 32, color: 'var(--red)', speed: 0.8 },
];

export default function Ending() {
  const startNext = () => {
    sideCannons();
    burstConfetti({ y: 0.55, power: 1.4 });
    setTimeout(() => turnPageTo('cover', 'A NEW CHAPTER'), 1100);
  };

  return (
    <section id="the-end" className="ending">
      <Doodles items={DOODLES} />
      <div className="ending-inner">
        <motion.div
          className="ending-then"
          initial={{ opacity: 0, x: -120 * flyInReach(), rotate: -10 }}
          whileInView={{ opacity: 1, x: 0, rotate: -4 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: 'spring', stiffness: 90, damping: 14 }}
        >
          <span className="ending-label">THEN</span>
          <Cutout src={images.heroSchoolbag} alt="Sreaya as a school girl" idle="bob" />
        </motion.div>

        <div className="ending-copy">
          <Caption typewriter className="ending-line1">
            {ending.line1}
          </Caption>
          <motion.h2
            className="ending-line2"
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 1.4 }}
          >
            {ending.line2}
          </motion.h2>
          <motion.button
            className="btn-comic ending-cta"
            onClick={startNext}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.9, type: 'spring', stiffness: 200, damping: 12 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            {ending.cta} <span className="arrow">→</span>
          </motion.button>
        </div>

        <motion.div
          className="ending-now"
          initial={{ opacity: 0, x: 120 * flyInReach(), rotate: 10 }}
          whileInView={{ opacity: 1, x: 0, rotate: 4 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.2 }}
        >
          <span className="ending-label">NOW</span>
          <Cutout src={images.now} alt="Sreaya today" idle="sway" />
        </motion.div>
      </div>

      <footer className="ending-footer">
        <p>{ending.footer}</p>
      </footer>
    </section>
  );
}
