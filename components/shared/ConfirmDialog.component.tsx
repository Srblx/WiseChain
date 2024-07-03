// Lib React
import React from 'react';
import { Button, Modal } from 'react-daisyui';

// Interfaces
import { ConfirmDialogProps } from '@/interfaces/auth/dialogAlert.interface';

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  infoMessage,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="modal-container w-[50%] z-50" id="confirm-dialog">
      <Modal
        open={isOpen}
        className="p-10 bg-gray-800 text-white rounded-sm overflow-hidden border-4 border-white"
      >
        <Modal.Header className="font-bold py-4 text-center text-red-500 text-2xl">{title}</Modal.Header>
        <Modal.Body>
          <p className='text-center'>{message}</p>
          <p className='text-center'>{infoMessage}</p>
        </Modal.Body>
        <Modal.Actions>
          <div className="flex justify-evenly mt-4">
            <Button
              onClick={onCancel}
              className="bg-green-400 border-none text-black hover:text-white hover:bg-gray-700"
            >
              Annuler
            </Button>
            <button
              id="btn-confirm-logout"
              onClick={onConfirm}
              className="p-2 bg-red-500 border-none text-black rounded-lg hover:text-white hover:bg-gray-700"
            >
              Confirmer
            </button>
          </div>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ConfirmDialog;