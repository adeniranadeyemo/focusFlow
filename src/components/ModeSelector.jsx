import { useState } from 'react';
import {
  pauseTimer,
  setActive,
  switchMode,
} from '../features/timer/timerSlice';

import { useDispatch, useSelector } from 'react-redux';

const Modes = [
  {
    id: 'focus',
    name: 'Focus',
  },
  {
    id: 'shortBreak',
    name: 'Short Break',
  },
  {
    id: 'longBreak',
    name: 'Long Break',
  },
];

export default function ModeSelector() {
  const dispatch = useDispatch();

  const timeLeft = useSelector((state) => state?.timer?.timeLeft);

  const stateActive = useSelector((state) => state?.timer?.active);

  const active = localStorage.getItem('mode') || stateActive;

  const handleSetBreak = (mode) => {
    dispatch(pauseTimer());

    dispatch(setActive(mode.id));
    localStorage.setItem('mode', mode.id);

    dispatch(switchMode(mode.id));
    localStorage.setItem('timeLeft', timeLeft);
  };

  return (
    <div className="flex justify-center gap-4">
      {Modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => handleSetBreak(mode)}
          className={`px-4 py-2 rounded-full cursor-pointer 
            ${active === mode.id ? 'tabs-active' : 'tabs'}
          `}
        >
          {mode.name}
        </button>
      ))}
    </div>
  );
}
