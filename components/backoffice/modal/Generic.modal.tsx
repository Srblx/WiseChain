// components/shared/Modal.tsx
import { Button } from '@/components/shared/Button.components';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: React.ReactNode;
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
        <h2 className="text-2xl font-extrabold mb-4">{title}</h2>
        <div className="mb-4">{content}</div>
        <div className="flex justify-end">
          <Button
            className="bg-gray-500 py-2 px-4 rounded-md mr-2"
            onClick={onClose}
          >
            Annuler
          </Button>
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
