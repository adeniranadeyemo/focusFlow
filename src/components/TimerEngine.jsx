import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  tick,
  nextSession,
  pauseTimer,
  switchMode,
  setActive,
} from '../features/timer/timerSlice';

import useAudio from '../hooks/useAudio';

import { toast } from 'sonner';
import BreakModal from './BreakModal';

function TimerEngine() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const isRunning = useSelector((state) => state?.timer?.isRunning);
  const timeLeft = useSelector((state) => state?.timer?.timeLeft);
  const mode = useSelector((state) => state?.timer?.mode);

  const { play } = useAudio('/sounds/dingNotif.mp3');

  const triggerCelebration = useCallback(
    (mode) => {
      play();

      toast.success(
        mode === 'focus'
          ? 'Focus session complete! Time for a break. 🎉'
          : 'Break over! Let’s focus again. 💪🏽',
        {
          duration: 5000,
        }
      );
    },
    [play]
  );

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        dispatch(tick());
      }, 1000);
    }

    if (timeLeft === 0) {
      dispatch(pauseTimer());
      triggerCelebration(mode);

      if (mode === 'focus') {
        setIsOpen(() => true);
      } else {
        dispatch(switchMode('focus'));
        dispatch(setActive('focus'));
        dispatch(nextSession());
      }
    }

    return () => clearInterval(interval);
  }, [timeLeft, isRunning, dispatch, mode, triggerCelebration]);

  return (
    <BreakModal isOpen={isOpen} onClose={() => setIsOpen(false)}></BreakModal>
  );
}

export default TimerEngine;
