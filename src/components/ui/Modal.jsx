import { useEffect, useRef } from 'react';

function Modal({ children, isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modalEl = modalRef.current;
    const focusableEls = modalEl.querySelectorAll(focusableSelectors);

    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    modalEl.addEventListener('keydown', handleKeyDown);
    firstEl?.focus();

    return () => {
      modalEl.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, modalRef]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 glass cursor-pointer -z-10"
        onClick={onClose}
      ></div>
      <div
        ref={modalRef}
        role="dialog"
        aria-labelledby="settings-title"
        aria-describedby="settings-description"
        aria-modal="true"
        className="system-color2 text-color p-lg border-radius-xl shadow-card w-[90%] max-w-md"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
