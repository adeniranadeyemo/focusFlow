import { useDispatch, useSelector } from 'react-redux';
import Modal from './ui/Modal';
import {
  resetSession,
  switchMode,
  updateSettings,
} from '../features/timer/timerSlice';

function DoneModal({ isDone, onClose }) {
  let session = useSelector((state) => state?.timer?.session);

  const dispatch = useDispatch();

  const handleRestart = () => {
    dispatch(
      updateSettings(
        {
          focus: 25 * 60,
          shortBreak: 5 * 60,
          longBreak: 10 * 60,
        },
        (session = 0)
      )
    );

    dispatch(switchMode('focus'));
    dispatch(resetSession());

    onClose();
  };

  if (!isDone) return;

  return (
    <Modal isOpen={isDone} onClose={onClose}>
      <div className="text-center">
        <h3>Congratulations! Four ({session}) sessions completed. </h3>
        <p>Click 'Restart' to restart focus sessions!</p>

        <button
          className="btn-primary p-sm border-radius-md cursor-pointer mt-4"
          onClick={handleRestart}
        >
          Restart
        </button>
      </div>
    </Modal>
  );
}

export default DoneModal;
