import { useState } from 'react';

const Modes = ['Focus', 'Short Break', 'Long Break'];

export default function ModeSelector() {
  const [active, setActive] = useState(() => localStorage.getItem('mode') || 'Focus');

  const handleSetActive = (mode) => {
    setActive(mode);
    localStorage.setItem('mode', mode);
  };

  return (
    <div className="flex justify-center gap-4">
      {Modes.map((mode) => (
        <button
          key={mode}
          onClick={() => handleSetActive(mode)}
          className={`px-4 py-2 rounded-full cursor-pointer 
            ${active === mode ? 'tabs-active' : 'tabs'}
          `}
        >
          {mode}
        </button>
      ))}
    </div>
  );
}
