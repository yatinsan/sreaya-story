import { useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { about, achievements, contact, education, hobbies, images, memories, projects, skills } from '../data/story.js';
import Cutout from '../components/comic/Cutout.jsx';
import SpeechBubble from '../components/comic/SpeechBubble.jsx';
import SFX from '../components/comic/SFX.jsx';
import Polaroid from '../components/comic/Polaroid.jsx';
import Doodles from '../components/comic/Doodles.jsx';
import { burstConfetti } from '../lib/confetti.js';

function SectionHeading({ id, icon, title, kicker }) {
  return (
    <motion.header
      className="s7-heading"
      initial={{ opacity: 0, x: -60, rotate: -4 }}
      whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: 'spring', stiffness: 180, damping: 14 }}
    >
      <span className="s7-heading-icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        {kicker && <span className="s7-heading-kicker">{kicker}</span>}
        <h3 id={`${id}-title`}>{title}</h3>
      </div>
    </motion.header>
  );
}

function ToBeContinued() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const halftone = useTransform(scrollYProgress, [0.3, 0.7], [1, 0]);
  const radius = useTransform(scrollYProgress, [0.3, 0.7], [0, 28]);
  const rotate = useTransform(scrollYProgress, [0.2, 0.6], [-3, 0]);
  const charY = useTransform(scrollYProgress, [0, 1], [120, -60]);

  return (
    <div ref={ref} className="s7-intro">
      <motion.div className="s7-intro-frame" style={{ borderRadius: radius, rotate }}>
        <motion.div className="s7-intro-halftone" style={{ opacity: halftone }} aria-hidden="true" />
        <span className="chapter-tag">CHAPTER 07</span>
        <h2 className="chapter-title">WHO IS SREAYA NOW?</h2>
        <motion.div className="s7-intro-char" style={{ y: charY }}>
          <Cutout src={images.now} alt="Sreaya today, standing confidently in a saree" idle="sway" />
        </motion.div>
        <motion.p
          className="s7-tbc"
          initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ type: 'spring', stiffness: 220, damping: 12 }}
        >
          “TO BE CONTINUED...”
        </motion.p>
        <p className="s7-intro-sub">The comic world slowly becomes the real world. (Don’t worry, the jokes stay.)</p>
      </motion.div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="s7-section" aria-labelledby="about-title">
      <SectionHeading id="about" icon="👩" title="ABOUT ME" kicker="ORIGIN STORY" />
      <div className="s7-about">
        <div className="s7-about-art">
          <Cutout src={images.canteen} alt="Sreaya laughing with chai" idle="bob" />
          <SpeechBubble className="s7-about-bubble" speaker="SREAYA" tail="bottom-left">
            {about.intro}
          </SpeechBubble>
        </div>
        <motion.div
          className="s7-card s7-about-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        >
          {about.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <ul className="s7-facts">
            {about.facts.map((f, i) => (
              <motion.li
                key={f}
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: i % 2 ? 2 : -2 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.2 + i * 0.12 }}
              >
                {f}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="s7-section" aria-labelledby="skills-title">
      <SectionHeading id="skills" icon="💡" title="SKILLS & SUPERPOWERS" kicker="CHARACTER STATS" />
      <div className="s7-sheet">
        <div className="s7-sheet-head">
          <span>SREAYA</span>
          <span>CLASS: HUMAN (RARE)</span>
          <span>LVL 99</span>
        </div>
        <div className="s7-skills">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              className="s7-skill"
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: 'spring', stiffness: 160, damping: 16, delay: (i % 2) * 0.1 }}
            >
              <div className="s7-skill-top">
                <span className="s7-skill-name">{s.name}</span>
                <span className="s7-skill-label" style={{ color: s.color }}>
                  {s.label}
                </span>
              </div>
              <div className="s7-bar">
                <motion.div
                  className="s7-bar-fill"
                  style={{ background: s.color }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: s.value / 100 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                />
              </div>
              {s.note && <span className="s7-skill-note">{s.note}</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="s7-section" aria-labelledby="education-title">
      <SectionHeading id="education" icon="🎓" title="EDUCATION" kicker="THE TRAINING ARC" />
      <ol className="s7-timeline">
        {education.map((e, i) => (
          <motion.li
            key={e.years}
            className={`s7-tl-item ${i % 2 ? 'right' : 'left'}`}
            initial={{ opacity: 0, x: i % 2 ? 80 : -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', stiffness: 140, damping: 15 }}
          >
            <span className="s7-tl-badge" aria-hidden="true">
              {e.badge}
            </span>
            <div className="s7-card s7-tl-card">
              <span className="s7-tl-years">{e.years}</span>
              <h4>{e.place}</h4>
              <p>{e.detail}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    rx.set(((e.clientY - r.top) / r.height - 0.5) * -18);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      className="s7-project"
      style={{ '--accent': project.color, rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 60, rotate: index % 2 ? 4 : -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: 'spring', stiffness: 140, damping: 14, delay: index * 0.1 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <div className="s7-project-head halftone halftone-light">
        <span className="s7-project-tag">{project.tag}</span>
        {project.emoji && (
          <span className="s7-project-emoji" aria-hidden="true">
            {project.emoji}
          </span>
        )}
        <span className="s7-project-num">#{String(index + 1).padStart(3, '0')}</span>
      </div>
      <div className="s7-project-body">
        <h4>{project.title}</h4>
        <p>{project.text}</p>
        <dl className="s7-project-stats">
          {Object.entries(project.stats).map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>
                <span style={{ width: `${v}%` }} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section id="projects" className="s7-section" aria-labelledby="projects-title">
      <SectionHeading id="projects" icon="🚀" title="PROJECTS" kicker="COLLECTIBLE CARDS" />
      <div className="s7-projects">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="s7-section" aria-labelledby="achievements-title">
      <SectionHeading id="achievements" icon="🏆" title="ACHIEVEMENTS" kicker="BADGES UNLOCKED" />
      <div className="s7-badges">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            className="s7-badge"
            initial={{ opacity: 0, rotateY: 180, scale: 0.6 }}
            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
            whileHover={{ rotate: [0, -6, 6, 0], scale: 1.05 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12, delay: i * 0.12 }}
          >
            <span className="s7-badge-icon" aria-hidden="true">
              {a.icon}
            </span>
            <h4>{a.title}</h4>
            <p>{a.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Hobbies() {
  const area = useRef(null);
  return (
    <section id="hobbies" className="s7-section" aria-labelledby="hobbies-title">
      <SectionHeading id="hobbies" icon="🎨" title="HOBBIES" kicker="SIDE QUESTS" />
      <div className="s7-hobbies" ref={area}>
        <span className="s7-hobbies-hint">psst... you can drag these stickers around ✋</span>
        {hobbies.map((h, i) => (
          <motion.div
            key={h.name}
            className="s7-hobby"
            drag
            dragConstraints={area}
            dragElastic={0.3}
            whileDrag={{ scale: 1.15, rotate: 0, zIndex: 10, cursor: 'grabbing' }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: (i % 3) * 4 - 4 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 12, delay: i * 0.07 }}
          >
            <span aria-hidden="true">{h.icon}</span> {h.name}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Memories() {
  return (
    <section id="memories" className="s7-section" aria-labelledby="memories-title">
      <SectionHeading id="memories" icon="📸" title="MEMORIES" kicker="THE SCRAPBOOK" />
      <div className="s7-memories">
        {memories.map((m, i) => (
          <Polaroid key={m.caption} {...m} delay={(i % 4) * 0.08} from={{ x: 0, y: 80 }} />
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`A letter from ${data.get('name') || 'a reader'}`);
    const body = encodeURIComponent(`${data.get('message') || ''}\n\n— ${data.get('name') || ''} (${data.get('email') || ''})`);
    setSent(true);
    burstConfetti({ y: 0.7 });
    setTimeout(() => {
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    }, 900);
  };

  return (
    <section id="contact" className="s7-section" aria-labelledby="contact-title">
      <SectionHeading id="contact" icon="💌" title="CONTACT" kicker={contact.heading} />
      <div className="s7-contact">
        <motion.form
          className="s7-letter"
          onSubmit={onSubmit}
          initial={{ opacity: 0, rotate: -6, y: 60 }}
          whileInView={{ opacity: 1, rotate: -1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        >
          <span className="s7-stamp" aria-hidden="true">
            💌
          </span>
          <p className="s7-letter-intro">Dear Sreaya,</p>
          <label>
            <span>My name is</span>
            <input name="name" type="text" placeholder="Your name" autoComplete="name" required />
          </label>
          <label>
            <span>Reach me at</span>
            <input name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
          </label>
          <label>
            <span>And I wanted to say...</span>
            <textarea name="message" rows="4" placeholder="Write your message here..." required />
          </label>
          <button className="btn-comic red" type="submit">
            {sent ? 'WHOOSH! SENT' : 'SEND IT!'} <span className="arrow">→</span>
          </button>
        </motion.form>

        <div className="s7-contact-side">
          <SpeechBubble tail="bottom-left" speaker="SREAYA">
            {contact.line}
          </SpeechBubble>
          <div className="s7-socials">
            {contact.socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="s7-social"
                whileHover={{ scale: 1.1, rotate: i % 2 ? 4 : -4 }}
                whileTap={{ scale: 0.9 }}
              >
                <span aria-hidden="true">{s.icon}</span> {s.label}
              </motion.a>
            ))}
          </div>
          <SFX text="WRITE TO ME!" size="2.4rem" color="var(--yellow)" rotate={-6} />
        </div>
      </div>
    </section>
  );
}

const DOODLES = [
  { type: 'star', top: '3%', right: '6%', size: 40, color: 'var(--yellow)', speed: 1.2 },
  { type: 'squiggle', top: '22%', left: '2%', size: 80, color: 'var(--sky)', speed: 0.9 },
  { type: 'heart', top: '48%', right: '3%', size: 36, color: 'var(--pink)', speed: 1.4 },
  { type: 'sparkle', top: '70%', left: '3%', size: 40, color: 'var(--purple)', speed: 1 },
  { type: 'circle', bottom: '6%', right: '8%', size: 50, color: 'var(--green)', speed: 1.1 },
];

export default function Ch7Portfolio() {
  return (
    <section id="ch-7" className="chapter ch7">
      <Doodles items={DOODLES} />
      <div className="chapter-inner">
        <ToBeContinued />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Achievements />
        <Hobbies />
        <Memories />
        <Contact />
      </div>
    </section>
  );
}
