// Lib React
import React from 'react';
import { Button, Modal } from 'react-daisyui';

// Interfaces
import { ConfirmDialogProps } from '@/interfaces/auth/dialogAlert.interface';

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div>
      <Modal
        open={isOpen}
        className="p-10 bg-background text-white rounded-sm overflow-hidden border-4 border-white"
      >
        <Modal.Header className="font-bold py-4">{title}</Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Actions>
          <div className="flex justify-between mt-4">
            <Button
              onClick={onCancel}
              className="bg-green-400 border-none text-black hover:text-white hover:bg-background"
            >
              Annuler
            </Button>
            <Button
              onClick={onConfirm}
              className="bg-red-500 border-none text-black hover:text-white hover:bg-background"
            >
              Confirmer
            </Button>
          </div>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ConfirmDialog;
