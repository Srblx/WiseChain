// Components
import { Button } from '@/components/shared/Button.components';

// React libs
import React, { ReactNode } from 'react';

// Icons
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  content,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-blueDark p-4 rounded-lg shadow-lg max-w-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-extrabold">{title}</h2>
          <button onClick={onClose}>
            <IoMdClose className="text-white text-2xl" />
          </button>
        </div>
        <div className="mb-4">{content}</div>
        <div className="flex justify-end">
          <Button
            className="bg-green-500 py-2 px-4 rounded-md"
            onClick={onConfirm}
          >
            Confirmer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
