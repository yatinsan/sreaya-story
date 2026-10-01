import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { initSmoothScroll, ScrollTrigger } from './lib/scroll.js';
import ComicNav from './components/nav/ComicNav.jsx';
import PageTurn from './components/comic/PageTurn.jsx';
import ClickPow from './components/comic/ClickPow.jsx';
import Hero from './chapters/Hero.jsx';
import Ch1School from './chapters/Ch1School.jsx';
import Ch2Friends from './chapters/Ch2Friends.jsx';
import Ch3Transition from './chapters/Ch3Transition.jsx';
import Ch4College from './chapters/Ch4College.jsx';
import Ch5CollegeFriends from './chapters/Ch5CollegeFriends.jsx';
import Ch6Chaos from './chapters/Ch6Chaos.jsx';
import Ch7Portfolio from './chapters/Ch7Portfolio.jsx';
import Ending from './chapters/Ending.jsx';

export default function App() {
  useEffect(() => {
    const stop = initSmoothScroll();
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    document.fonts?.ready.then(onLoad);
    return () => {
      stop();
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ComicNav />
      <main className="comic-book">
        <Hero />
        <Ch1School />
        <Ch2Friends />
        <Ch3Transition />
        <Ch4College />
        <Ch5CollegeFriends />
        <Ch6Chaos />
        <Ch7Portfolio />
        <Ending />
      </main>
      <PageTurn />
      <ClickPow />
    </MotionConfig>
  );
}
