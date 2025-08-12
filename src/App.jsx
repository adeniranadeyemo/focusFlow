import './App.css';
import './index.css';

import { Toaster } from 'sonner';

import { useCallback, useEffect, useRef, useState } from 'react';

import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';
import SessionTracker from './components/SessionTracker';
import Footer from './components/Footer';
import TimerEngine from './components/TimerEngine';

import { useDispatch } from 'react-redux';
import {
  startTimer,
  resetTimer,
  switchMode,
  setActive,
} from './features/timer/timerSlice';
// import PwaUpdateHandler from './components/PwaUpdateHandler';

function App() {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        setHeaderHeight(headerRef.current.offsetHeight);
      });
      resizeObserver.observe(headerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  function KeyboardShortcuts() {
    const dispatch = useDispatch();

    const reset = useCallback(() => {
      dispatch(switchMode('focus'));
      dispatch(setActive('focus'));
      dispatch(resetTimer());

      localStorage.setItem('mode', 'focus');
    }, [dispatch]);

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')

        switch (e.key.toLowerCase()) {
          case ' ':
            e.preventDefault();
            dispatch(startTimer());
            break;
          case 'r':
            reset();
            break;
          case 'escape':
            break;
          default:
            break;
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [dispatch, reset]);

    return null;
  }

  KeyboardShortcuts();

  // export default KeyboardShortcuts;

  return (
    <div className="h-fit system-color flex flex-col justify-center">
      <header ref={headerRef} className="pb-10">
        <Header />
      </header>

      <main
        className="flex flex-col items-center gap-6 px-4 pb-8"
        style={{ paddingTop: `${headerHeight}px` }}
      >
        <TimerDisplay />
        <SessionTracker />
        <TimerControls />

        <ModeSelector />
      </main>

      <Footer />

      <TimerEngine />
      <Toaster richColors position="top-center" />

      {/* <PwaUpdateHandler /> */}
    </div>
  );
}

export default App;
