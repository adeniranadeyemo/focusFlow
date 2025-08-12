import { useDispatch, useSelector } from 'react-redux';
import {
  startTimer,
  pauseTimer,
  resetTimer,
  setActive,
  switchMode,
} from '../features/timer/timerSlice';
import { GiPauseButton, GiPlayButton } from 'react-icons/gi';
import { RiResetLeftFill } from 'react-icons/ri';

import useAudio from '../hooks/useAudio';

export default function TimerControls() {
  const dispatch = useDispatch();
  const isRunning = useSelector((state) => state?.timer?.isRunning);
  const { play } = useAudio('../assets/dingNotif.mp3');

  const handleStart = () => {
    play();
    dispatch(startTimer());
  };

  const reset = () => {
    dispatch(switchMode('focus'));
    dispatch(setActive('focus'));
    dispatch(resetTimer());

    localStorage.setItem('mode', 'focus');
  };

  return (
    <div className="flex justify-center gap-4 m-md">
      {isRunning ? (
        <button
          onClick={() => dispatch(pauseTimer())}
          className="btn-primary border-radius-lg p-md shadow-card shadow-hover shadow-active font-semibold text-sm cursor-pointer active:scale-95"
        >
          <GiPauseButton />
        </button>
      ) : (
        <button
          onClick={handleStart}
          className="btn-primary border-radius-lg p-md shadow-card shadow-hover shadow-active font-semibold text-sm cursor-pointer active:scale-95"
        >
          <GiPlayButton />
        </button>
      )}

      <button
        onClick={reset}
        className="btn-outline border-radius-lg p-md shadow-card shadow-hover shadow-active font-semibold text-sm cursor-pointer active:scale-95"
      >
        <RiResetLeftFill />
      </button>
    </div>
  );
}
