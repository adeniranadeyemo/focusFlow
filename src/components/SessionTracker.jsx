function SessionTracker() {
  const mode = 'Focus';
  const current = 0;
  const total = 4;

  return (
    <div className="flex flex-col items-center mt-sm">
      <p className="text-xs text-color-muted tracking-wide uppercase font-medium">
        {mode} Session
      </p>
      <p className="text-sm text-color font-semibold tracking-normal mt-xs">
        Session {current} of {total}
      </p>
    </div>
  );
}

export default SessionTracker;
