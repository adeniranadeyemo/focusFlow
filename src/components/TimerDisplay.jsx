function TimerDisplay() {
  const time = '25:00';
  const progress = 0.25;

  const radius = 100;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.05;
  const circumference = normalizedRadius * 2 * Math.PI;
  // const strokeDashoffset = circumference - (progress / 100) * circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

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
          stroke="var(--color-brand-light)"
          className="dark:stroke-[var(--color-brand-dark)] transition-all duration-500"
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

      {/* Timer Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h2 className="text-5xl text-color font-bold tracking-widest leading-tight font-sans">
          {time}
        </h2>
        <p className="text-sm text-color-muted tracking-wide mt-sm font-medium uppercase">
          Focus Session
        </p>
      </div>
    </div>
  );
}

export default TimerDisplay;
