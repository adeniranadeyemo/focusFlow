import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import beepSound from '../assets/dingNotif.mp3';

function TimerDisplay() {
  const mode = useSelector((state) => state?.timer?.mode);
  const durations = useSelector((state) => state?.timer?.durations);
  const timeLeft = useSelector((state) => state?.timer?.timeLeft);

  const isFinalCountdown = timeLeft <= 5;

  const totalTime = durations[mode];
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const radius = 105;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.05;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  // const strokeDashoffset = circumference - progress * circumference;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins =
      seconds >= 3600
        ? Math.floor((seconds % 3600) / 60)
        : Math.floor(seconds / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${mins.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    }
  };

  const beepRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(beepSound);
    audio.preload = 'auto';
    beepRef.current = audio;
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && timeLeft <= 5) {
      if (beepRef.current) {
        beepRef.current.currentTime = 0;
        beepRef.current.play().catch(() => {});
      }
    }
  }, [timeLeft]);

  return (
    <div className="relative w-[20rem] h-[15rem] sm:w-[300px] sm:h-[300px] m-md">
      {/* SVG Progress Ring */}
      <svg height="100%" width="100%" className="transform -rotate-90">
        <circle
          stroke="var(--color-muted-light)"
          className="dark:stroke-[var(--color-muted-dark)]"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="50%"
          cy="50%"
        />
        <circle
          stroke={
            mode === 'focus'
              ? 'var(--color-brand-light)'
              : mode === 'shortBreak'
              ? '#4ade80' // green
              : '#60a5fa' // blue
          }
          className={` transition-all duration-500 ${
            isFinalCountdown ? 'ring-alert' : ''
          }`}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx="50%"
          cy="50%"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h2
          key={timeLeft}
          className={`text-4xl text-color font-bold tracking-widest leading-tight font-sans ${
            isFinalCountdown ? 'shake text-red-500' : ''
          }`}
        >
          {formatTime(timeLeft)}
        </h2>

        <p
          key={mode}
          className="text-sm text-color-muted tracking-wide mt-sm font-medium uppercase transition-opacity duration-500 opacity-100 animate-fadeIn"
        >
          {mode === 'focus'
            ? 'Focus Session'
            : mode === 'shortBreak'
            ? 'Short Break'
            : 'Long Break'}
        </p>
      </div>
    </div>
  );
}

export default TimerDisplay;
