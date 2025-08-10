import { useDispatch } from 'react-redux';
import Modal from './ui/Modal';
import { startTimer, switchMode } from '../features/timer/timerSlice';

const Modes = [
  {
    id: 'shortBreak',
    name: 'Short Break',
  },
  {
    id: 'longBreak',
    name: 'Long Break',
  },
];

function BreakModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const handleSetBreak = (mode) => {
    dispatch(switchMode(mode.id));
    dispatch(startTimer());

    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3>Focus time is over. Time for a break!</h3>

      <div className="flex justify-center gap-4 mt-4">
        {Modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleSetBreak(mode)}
            className={`px-4 py-2 rounded-full cursor-pointer 
            tabs
          `}
          >
            {mode.name}
          </button>
        ))}
      </div>
    </Modal>
  );
}

export default BreakModal;
