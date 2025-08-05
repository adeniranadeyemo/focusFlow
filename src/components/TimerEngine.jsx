import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tick, nextSession, pauseTimer } from '../features/timer/timerSlice';

function TimerEngine() {
  const dispatch = useDispatch();
  const isRunning = useSelector((state) => state?.timer?.isRunning);
  const timeLeft = useSelector((state) => state?.timer?.timeLeft);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        dispatch(tick());
      }, 1000);
    }

    if (timeLeft === 0) {
      dispatch(nextSession());
      dispatch(pauseTimer());
    }

    return () => clearInterval(interval);
  }, [timeLeft, isRunning, dispatch]);

  return null;
}

export default TimerEngine;
