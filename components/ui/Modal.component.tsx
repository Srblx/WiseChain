import { disableScroll, enableScroll } from '@/app/_utils/disableScroll';
import { FC, ReactNode, useEffect, useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    if (isOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className='h-screen fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden'>
        <div className='w-full h-full mx-auto flex flex-col justify-center items-center p-8'>
          <button className='absolute top-6 right-6' onClick={onClose}>
            <FaWindowClose className='text-white text-2xl absolute z-20 right-2' />
          </button>
          <div className='rounded-lg p-8 max-w-md'>
            {children}
            </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
