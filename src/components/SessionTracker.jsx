import { useSelector } from "react-redux";

function SessionTracker() {
  const mode = useSelector(state => state?.timer?.mode);
  const current = 0;
  const total = useSelector(state => state?.timer?.totalSessions);

  return (
    <div className="flex flex-col items-center mt-sm">
      <p className="text-xs text-color-muted tracking-wide uppercase font-medium">
        {mode === 'focus' ? `${mode} session` : mode}
      </p>
      <p className="text-sm text-color font-semibold tracking-normal mt-xs">
        Session {current} of {total}
      </p>
    </div>
  );
}

export default SessionTracker;
