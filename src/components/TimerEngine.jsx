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
import DoneModal from './DoneModal';

function TimerEngine() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const dispatch = useDispatch();

  const isRunning = useSelector((state) => state?.timer?.isRunning);
  const timeLeft = useSelector((state) => state?.timer?.timeLeft);
  const mode = useSelector((state) => state?.timer?.mode);
  const session = useSelector((state) => state?.timer?.session);

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

    if (timeLeft === 0 && session !== 4) {
      dispatch(pauseTimer());
      triggerCelebration(mode);

      if (mode === 'focus') {
        setIsOpen(() => true);
      } else {
        dispatch(nextSession());
        dispatch(switchMode('focus'));
        dispatch(setActive('focus'));
      }
    }

    if (timeLeft === 0 && session === 4) {
      dispatch(pauseTimer());

      toast.success(
        'Completed 4 sessions like the champ that you are! Well-done! 🏆'
      );

      setIsDone(() => true);
    }

    return () => clearInterval(interval);
  }, [timeLeft, isRunning, dispatch, mode, triggerCelebration, session]);

  return (
    <>
      <BreakModal isOpen={isOpen} onClose={() => setIsOpen(false)}></BreakModal>
      <DoneModal isDone={isDone} onClose={() => setIsDone(false)}></DoneModal>
    </>
  );
}

export default TimerEngine;
