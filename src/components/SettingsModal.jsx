import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings } from '../features/timer/timerSlice';
import Modal from './ui/Modal';

function SettingsModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const durations = useSelector((state) => state?.timer?.durations);

  const [formData, setFormData] = useState({
    focus: durations?.focus / 60,
    shortBreak: durations?.shortBreak / 60,
    longBreak: durations?.longBreak / 60,
  });


  const handleSave = () => {
    dispatch(
      updateSettings({
        focus: formData.focus * 60,
        shortBreak: formData.shortBreak * 60,
        longBreak: formData.longBreak * 60,
      })
    );

    onClose();
  };

  const handleReset = () => {
    setFormData({
      focus: 25,
      shortBreak: 5,
      longBreak: 10,
    });
  };

  // const handleMax = (e, setState) => {
  //   const value = Math.min(Number(e.target.value), 180);
  //   setState(value);
  // };

  const handleChange = (key, value) => {
    setFormData((data) => ({
      ...data,
      [key]: value > 180 ? 180 : value,
    }));
  };

  
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2
        id="settings-title"
        className="text-xl font-semibold mb-4 text-center"
      >
        Custom Durations (Mins)
      </h2>

      <div className="flex flex-col gap-y-2 mb-md">
        <label className="flex justify-between items-center">
          <span>Focus:</span>
          <input
            type="number"
            min="1"
            max="180"
            value={formData.focus}
            onChange={(e) => handleChange('focus', Number(e.target.value))}
            className="p-sm border-radius-md w-20 text-center text-color system-color"
          />
        </label>

        <label className="flex justify-between items-center">
          <span>Short Break:</span>
          <input
            type="number"
            min="1"
            max="180"
            value={formData.shortBreak}
            onChange={(e) => handleChange('shortBreak', Number(e.target.value))}
            className="p-sm border-radius-md w-20 text-center text-color system-color"
          />
        </label>

        <label className="flex justify-between items-center">
          <span>Long Break:</span>
          <input
            type="number"
            min="1"
            max="180"
            value={formData.longBreak}
            onChange={(e) => handleChange('longBreak', Number(e.target.value))}
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

      <button
        onClick={handleReset}
        className="border-radius-md text-gray-100 bg-accent-red cursor-pointer p-2 mt-4 float-right"
      >
        Reset
      </button>

      <p className="text-xs text-center text-muted-foreground mt-4">
        Durations over 60 minutes will be shown as hours.
      </p>
    </Modal>
  );
}

export default SettingsModal;
