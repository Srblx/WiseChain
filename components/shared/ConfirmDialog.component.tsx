// Lib React
import React from 'react';

interface ConfirmDialogProps {
  id: string;
  title: string;
  message?: string;
  text?: React.ReactNode;
  infoMessage?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  choice?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  id,
  title,
  message,
  text,
  infoMessage,
  onConfirm,
  onCancel,
  choice,
}) => {
  return (
    <dialog
      id={id}
      className="modal fixed inset-0 max-h-[100%] max-w-[100%] flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-60 m-0"
    >
      <div className="modal-box bg-background max-w-[55rem] text-white p-10 xs:p-4 rounded-md border-2 border-backgroundTransparent">
        <h3 className="font-bold text-2xl text-center">{title}</h3>
        <p className="pt-8 text-center">{message}</p>
        <p className="text-center">{infoMessage}</p>
        {text}
        <div className="modal-action flex justify-center items-center">
          <form method="dialog" className="space-x-4">
            {!choice && (
              <button
                className="btn bg-red-600 text-white hover:bg-black border-none"
                onClick={onConfirm}
              >
                Confirmer
              </button>
            )}
            <button
              className="btn text-white font-extrabold bg-background hover:bg-black border-none"
              onClick={onCancel}
            >
              {choice ? choice : 'Annuler'}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmDialog;
