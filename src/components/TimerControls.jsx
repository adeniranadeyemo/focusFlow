export default function TimerControls() {
  return (
    <div className="flex justify-center gap-4 m-md">
      <button className="btn-primary border-radius-lg p-md shadow-card shadow-hover shadow-active font-semibold text-sm cursor-pointer">
        Start
      </button>

      {/* Pause Button (initially disabled) */}
      <button
        className="btn-outline border-radius-lg p-md shadow-card shadow-hover shadow-active font-semibold text-sm opacity-50 cursor-not-allowed"
        disabled
      >
        Pause
      </button>

      <button className="btn-outline border-radius-lg p-md shadow-card shadow-hover shadow-active font-semibold text-sm cursor-pointer">
        Reset
      </button>
    </div>
  );
}
