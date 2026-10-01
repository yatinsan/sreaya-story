import { useLayoutEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from '../lib/scroll.js';
import { images, school } from '../data/story.js';
import Panel from '../components/comic/Panel.jsx';
import SpeechBubble from '../components/comic/SpeechBubble.jsx';
import Caption from '../components/comic/Caption.jsx';
import SFX from '../components/comic/SFX.jsx';
import Cutout from '../components/comic/Cutout.jsx';
import Doodles from '../components/comic/Doodles.jsx';
import { Bell } from '../components/comic/Props.jsx';

const DOODLES = [
  { type: 'star', top: '6%', left: '3%', size: 40, color: 'var(--yellow)', speed: 1.4 },
  { type: 'squiggle', top: '30%', right: '3%', size: 80, color: 'var(--blue)', speed: 0.8 },
  { type: 'circle', bottom: '12%', left: '2%', size: 50, color: 'var(--red)', speed: 1.2 },
  { type: 'arrow', top: '12%', right: '22%', size: 70, color: 'var(--ink)', speed: 1 },
  { type: 'sparkle', bottom: '6%', right: '8%', size: 36, color: 'var(--pink)', speed: 1.6 },
];

export default function Ch1School() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const titleRef = useRef(null);
  const [p1, p2, p3] = school.panels;

  const { scrollYProgress } = useScroll({ target: titleRef, offset: ['start end', 'end start'] });
  const buildingY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const buildingScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 899px) and (prefers-reduced-motion: no-preference)',
      },
      (ctx) => {
        const { desktop } = ctx.conditions;

        if (desktop) {
          const tl = gsap.timeline({
            defaults: { ease: 'back.out(1.6)', duration: 1 },
            scrollTrigger: {
              trigger: stageRef.current,
              start: 'top top',
              end: '+=320%',
              scrub: 0.7,
              pin: true,
              anticipatePin: 1,
            },
          });

          tl.from('.s1-p1', { xPercent: -40, opacity: 0, rotate: -8 })
            .from('.s1-p1 .s1-caption', { y: -40, opacity: 0 }, '<0.3')
            .from('.s1-walker', { xPercent: -180, ease: 'power1.out', duration: 1.6 }, '<')
            .from('.s1-p1 .s1-bubble', { scale: 0, opacity: 0, transformOrigin: '20% 100%' })
            .from('.s1-p2', { y: 160, opacity: 0, rotate: 6 }, '+=0.2')
            .from('.s1-bell', { scale: 0, rotate: -90 }, '<0.3')
            .to('.s1-bell', { rotate: 22, duration: 0.12, repeat: 7, yoyo: true, ease: 'none' })
            .from('.s1-ring', { scale: 0, rotate: -50, opacity: 0 }, '<')
            .from('.s1-shocked', { yPercent: 110, ease: 'back.out(2)' }, '<0.3')
            .from('.s1-p2 .s1-bubble', { scale: 0, opacity: 0, transformOrigin: '80% 100%' })
            .from('.s1-p3', { xPercent: 40, opacity: 0, rotate: 8 }, '+=0.2')
            .from('.s1-teacher', { xPercent: 160, ease: 'power1.out', duration: 1.6 }, '<0.2')
            .from('.s1-teacher-bubble', { scale: 0, opacity: 0, transformOrigin: '100% 100%' })
            .from('.s1-friends', { yPercent: 100 }, '<')
            .from('.s1-shout', { scale: 0, rotate: -30, opacity: 0 })
            .from('.s1-thought', { scale: 0, opacity: 0, transformOrigin: '0% 100%' })
            .from('.s1-narrator', { x: -80, opacity: 0 })
            .from('.s1-wrong', { scale: 0, rotate: 40, opacity: 0 }, '<0.3')
            .to({}, { duration: 0.6 });
        } else {
          gsap.utils.toArray('.s1-panel').forEach((panel) => {
            gsap
              .timeline({ scrollTrigger: { trigger: panel, start: 'top 78%' } })
              .from(panel, { y: 80, opacity: 0, rotate: -4, duration: 0.7, ease: 'back.out(1.4)' })
              .from(panel.querySelectorAll('[data-pop]'), { scale: 0, opacity: 0, stagger: 0.18, duration: 0.5, ease: 'back.out(2)' }, '-=0.2')
              .from(panel.querySelectorAll('[data-slide]'), { xPercent: (i, el) => (el.dataset.slide === 'right' ? 120 : -120), duration: 0.9, ease: 'power2.out' }, 0.2);
          });
        }
      },
      sectionRef.current
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="ch-1" ref={sectionRef} className="chapter ch1">
      <Doodles items={DOODLES} />
      <div className="chapter-inner">
        <header className="title-card ch1-title" ref={titleRef}>
          <div className="ch1-title-text">
            <span className="chapter-tag">CHAPTER 01</span>
            <h2 className="chapter-title">SCHOOL DAYS</h2>
            <p className="chapter-sub">{school.sub}</p>
          </div>
          <Panel className="ch1-building" tilt={1.5} from="right" halftone={false}>
            <motion.img
              src={images.schoolBuilding}
              alt={`Comic illustration of ${school.name}`}
              style={{ y: buildingY, scale: buildingScale }}
              loading="lazy"
            />
            <div className="ch1-sign">{school.name}</div>
            <SFX text="DING DONG!" size="1.6rem" color="var(--yellow)" rotate={-10} className="ch1-dingdong" delay={0.4} />
          </Panel>
        </header>
      </div>

      <div className="ch1-stage" ref={stageRef}>
        <div className="ch1-panels">
          <Panel className="s1-panel s1-p1" animate={false} halftone number="1" bg="var(--sky)">
            <img className="s1-bg" src={images.schoolBuilding} alt="" loading="lazy" />
            <Caption animate={false} className="s1-caption" hand>
              {p1.caption}
            </Caption>
            <div className="s1-walker" data-slide="left">
              <Cutout src={images.schoolWalk} alt="Sreaya walking into school" idle="bob" />
            </div>
            <div className="s1-bubble" data-pop>
              <SpeechBubble animate={false} speaker={p1.bubble.speaker} tail="bottom-right">
                {p1.bubble.text}
              </SpeechBubble>
            </div>
          </Panel>

          <Panel className="s1-panel s1-p2" animate={false} number="2" bg="var(--yellow)">
            <div className="speedlines" aria-hidden="true" />
            <div className="s1-bell" data-pop>
              <Bell className="ring-loop" />
            </div>
            <div className="s1-ring" data-pop>
              <SFX animate={false} text={`🔔 ${p2.sfx}`} size="clamp(1.6rem, 3vw, 2.6rem)" color="var(--red)" rotate={-8} shake spikes={18} />
            </div>
            <div className="s1-shocked" data-slide="left">
              <Cutout src={images.schoolShocked} alt="Sreaya shocked by the school bell" idle={null} />
            </div>
            <div className="s1-bubble" data-pop>
              <SpeechBubble animate={false} speaker={p2.bubble.speaker} tail="bottom-left">
                {p2.bubble.text}
              </SpeechBubble>
            </div>
          </Panel>

          <Panel className="s1-panel s1-p3" animate={false} number="3" bg="var(--paper)">
            <img className="s1-bg" src={images.classroom} alt="" loading="lazy" />
            <div className="s1-teacher" data-slide="right">
              <Cutout src={images.teacher} alt="The teacher walking into class" idle="sway" />
            </div>
            <div className="s1-teacher-bubble" data-pop>
              <SpeechBubble animate={false} speaker="TEACHER" tail="bottom-right">
                {p3.teacher}
              </SpeechBubble>
            </div>
            <div className="s1-friends" data-slide="left">
              <Cutout src={images.schoolFriends} alt="Classmates greeting the teacher" idle={null} />
            </div>
            <div className="s1-shout" data-pop>
              <SpeechBubble animate={false} variant="shout" burstColor="var(--white)">
                {`EVERYONE: ${p3.everyone}`}
              </SpeechBubble>
            </div>
            <div className="s1-thought" data-pop>
              <SpeechBubble animate={false} variant="thought" speaker="SREAYA (thinking)">
                {p3.thought}
              </SpeechBubble>
            </div>
            <div className="s1-narrator" data-pop>
              <Caption animate={false} narrator>
                {p3.narrator}
              </Caption>
            </div>
            <div className="s1-wrong" data-pop>
              <SFX animate={false} text="OOPS!" size="1.6rem" color="var(--pink)" rotate={14} />
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}
