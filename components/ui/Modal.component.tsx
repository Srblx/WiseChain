// Libs React
import { FC, useEffect } from 'react';

// Interfaces
import { ModalProps } from '@/interfaces/modal.interface';

// Utils
import { disableScroll, enableScroll } from '@/utils/disableScroll.utils';

// Icons
import React from 'react';
import { FaWindowClose } from 'react-icons/fa';

const Modal: FC<ModalProps> = ({ isOpen, onClose, onSuccess, children }) => {
  useEffect(() => {
    isOpen ? disableScroll() : enableScroll();
  }, [isOpen]);

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    }
    onClose();
  };

  return isOpen ? (
    <div className="h-screen fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden">
      <div className="w-full h-full mx-auto flex flex-col justify-center items-center p-8">
        <button className="absolute top-6 right-6" onClick={onClose}>
          <FaWindowClose className="text-white text-2xl absolute z-20 right-2" />
        </button>
        <div className="rounded-lg p-8 max-w-md">
          {React.cloneElement(children as React.ReactElement, {
            onSuccess: handleSuccess,
          })}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
