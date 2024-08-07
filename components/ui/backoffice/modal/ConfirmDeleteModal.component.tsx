// React libs
import React, { useEffect, useRef } from 'react';

interface ConfirmDeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  firstname: string;
  lastname: string;
}

const ConfirmDeleteUserModal: React.FC<ConfirmDeleteUserModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  firstname,
  lastname,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      id="confirm_delete_modal"
      className="modal modal-bottom sm:modal-middle"
      ref={modalRef}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirmer la suppression</h3>
        <p className="py-4">
          Êtes-vous sûr de vouloir supprimer l'utilisateur {firstname}{' '}
          {lastname} ?
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-outline mr-2" onClick={onClose}>
              Annuler
            </button>
            <button className="bg-red-600 rounded-md p-3" onClick={onConfirm}>
              Supprimer
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmDeleteUserModal;
