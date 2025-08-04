import './App.css';
import './index.css';

import { useEffect, useRef, useState } from 'react';

import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';
import SessionTracker from './components/SessionTracker';
import Footer from './components/Footer';

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

  console.log(headerRef);
  console.log(headerHeight);

  return (
    <div className="h-fit system-color flex flex-col justify-center">
      <header ref={headerRef} className="pb-10">
        <Header />
      </header>

      <main
        className="flex float-end flex-col items-center gap-6 px-4 pb-8"
        style={{ paddingTop: `${headerHeight}px` }}
      >
        <TimerDisplay />
        <SessionTracker />
        <TimerControls />

        <ModeSelector />

        <Footer />
      </main>
    </div>
  );
}

export default App;
