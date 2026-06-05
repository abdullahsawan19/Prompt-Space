import { createPortal } from "react-dom";
import { HiOutlineX } from "react-icons/hi";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative bg-[var(--color-grey-0)] w-full max-w-lg p-6 rounded-2xl shadow-2xl mx-4 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[var(--color-grey-400)] hover:text-[var(--color-grey-700)] hover:bg-[var(--color-grey-100)] rounded-md transition-colors"
        >
          <HiOutlineX size={24} />
        </button>

        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
