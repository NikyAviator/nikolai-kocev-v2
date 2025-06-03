import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

const Modal = ({ imageSrc, altText, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
      {/* Blurry background (Click outside to close) */}
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <DialogPanel className="relative w-full max-w-3xl rounded-lg bg-gray-800 p-6 shadow-lg">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-2 rounded-full bg-black p-2 text-white hover:bg-gray-600"
          >
            X
          </button>

          {/* Enlarged Image */}
          <img
            src={imageSrc}
            alt={altText}
            className="h-auto w-full rounded-lg"
          />
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
