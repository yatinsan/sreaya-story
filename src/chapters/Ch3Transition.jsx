import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/scroll.js';
import { images, transition } from '../data/story.js';
import Cutout from '../components/comic/Cutout.jsx';
import SFX from '../components/comic/SFX.jsx';

export default function Ch3Transition() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const words = transition.narrator.split(' ');

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 899px) and (prefers-reduced-motion: no-preference)',
      },
      (ctx) => {
        const { desktop } = ctx.conditions;
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stageRef.current,
            start: 'top top',
            end: desktop ? '+=260%' : '+=200%',
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo('.s3-school img', { scale: 1.05 }, { scale: 1.35, duration: 3 }, 0)
          .fromTo('.s3-dusk', { opacity: 0 }, { opacity: 0.7, duration: 3 }, 0)
          .fromTo('.s3-walker', { scale: 1, yPercent: 0 }, { scale: 0.38, yPercent: -14, duration: 3 }, 0)
          .from('.s3-word', { opacity: 0.12, y: 10, stagger: 0.12, duration: 0.4 }, 0.1)
          .fromTo('.s3-xp-fill', { scaleX: 0.15 }, { scaleX: 1, duration: 2.6 }, 0)
          .to('.s3-hud-l1', { opacity: 0, y: -12, duration: 0.2 }, 3)
          .from('.s3-hud-l2', { opacity: 0, y: 12, duration: 0.2 }, 3)
          .fromTo('.s3-flash', { opacity: 0 }, { opacity: 1, duration: 0.15 }, 3)
          .to('.s3-flash', { opacity: 0, duration: 0.5 }, 3.15)
          .fromTo('.s3-college', { clipPath: 'circle(0% at 50% 60%)' }, { clipPath: 'circle(80% at 50% 60%)', duration: 1.4, ease: 'power2.inOut' }, 3)
          .fromTo('.s3-college img', { scale: 1.4 }, { scale: 1, duration: 1.8, ease: 'power2.out' }, 3)
          .from('.s3-unlocked', { scale: 0, rotate: -35, duration: 0.6, ease: 'back.out(2.2)' }, 3.1)
          .to('.s3-unlocked', { scale: 1.12, duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 3.8)
          .from('.s3-welcome', { yPercent: 140, opacity: 0, duration: 0.5, ease: 'back.out(1.8)' }, 4.2)
          .to({}, { duration: 0.6 });
      },
      sectionRef.current
    );
    return () => mm.revert();
  }, []);

  return (
    <section id="ch-3" ref={sectionRef} className="ch3">
      <div className="s3-stage" ref={stageRef}>
        <div className="s3-school">
          <img src={images.schoolBuilding} alt="" loading="lazy" />
          <div className="s3-dusk" aria-hidden="true" />
        </div>

        <div className="s3-walker">
          <Cutout src={images.walkAway} alt="Sreaya walking away from school, waving goodbye" idle="bob" />
        </div>

        <div className="s3-narration caption narrator">
          {words.map((w, i) => (
            <span key={i} className="s3-word">
              {w}{' '}
            </span>
          ))}
        </div>

        <div className="s3-hud" aria-hidden="true">
          <div className="s3-hud-labels">
            <span className="s3-hud-l1">LEVEL 01: SCHOOL</span>
            <span className="s3-hud-l2">LEVEL 02: COLLEGE</span>
          </div>
          <div className="s3-xp">
            <div className="s3-xp-fill" />
          </div>
          <span className="s3-hud-xp">XP: FRIENDSHIP · EXAMS · CHAOS</span>
        </div>

        <div className="s3-college">
          <img src={images.college} alt="Comic illustration of Idukki College among misty hills" loading="lazy" />
          <div className="s3-college-tint" aria-hidden="true" />
        </div>

        <div className="s3-flash" aria-hidden="true" />

        <div className="s3-unlocked">
          <SFX animate={false} text={transition.unlocked} size="clamp(2.4rem, 7vw, 6rem)" color="var(--yellow)" rotate={-6} spikes={22} />
        </div>

        <header className="s3-title">
          <span className="chapter-tag">CHAPTER 03</span>
          <h2>THE BIG TRANSITION</h2>
        </header>

        <div className="s3-welcome caption hand">Welcome to a whole new universe →</div>
      </div>
    </section>
  );
}
