import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDurations } from '../features/timer/timerSlice';

function SettingsModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const durations = useSelector((state) => state?.timer?.durations);

  const [focus, setFocus] = useState(durations.focus / 60);
  const [shortBreak, setShortBreak] = useState(durations.shortBreak / 60);
  const [longBreak, setLongBreak] = useState(durations.longBreak / 60);

  const handleSave = () => {
    dispatch(
      updateDurations({
        focus: focus * 60,
        shortBreak: shortBreak * 60,
        longBreak: longBreak * 60,
      })
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-gray-700 opacity-90 cursor-pointer -z-10"
        onClick={onClose}
      ></div>
      <div className="system-color2 text-color p-lg border-radius-xl shadow-card w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Custom Durations
        </h2>

        <div className="flex flex-col gap-y-2 mb-md">
          <label className="flex justify-between items-center">
            <span>Focus:</span>
            <input
              type="number"
              min="1"
              value={focus}
              onChange={(e) => setFocus(Number(e.target.value))}
              className="p-sm border-radius-md w-20 text-center text-color system-color"
            />
          </label>

          <label className="flex justify-between items-center">
            <span>Short Break:</span>
            <input
              type="number"
              min="1"
              value={shortBreak}
              onChange={(e) => setShortBreak(Number(e.target.value))}
              className="p-sm border-radius-md w-20 text-center text-color system-color"
            />
          </label>

          <label className="flex justify-between items-center">
            <span>Long Break:</span>
            <input
              type="number"
              min="1"
              value={longBreak}
              onChange={(e) => setLongBreak(Number(e.target.value))}
              className="p-sm border-radius-md w-20 text-center text-color system-color"
            />
          </label>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="btn-outline p-sm border-radius-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary p-sm border-radius-md cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
