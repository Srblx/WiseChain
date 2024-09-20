import { Button } from '@/components/shared/Button.components';
import InputShared from '@/components/shared/InputShared.component';
import React, { FC, useEffect, useState } from 'react';

import { CloseButton } from '../shared/CloseButton.component';

interface Glossary {
  title: string;
  definition: string;
}

interface ModalGlossaryProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedGlossaryItem: Glossary, resetForm: () => void) => void;
  glossaryItemToEdit?: Glossary | null;
}

const ModalGlossary: FC<ModalGlossaryProps> = ({
  isOpen,
  onClose,
  onSubmit,
  glossaryItemToEdit,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    definition: '',
  });

  useEffect(() => {
    if (glossaryItemToEdit) {
      setFormData({
        title: glossaryItemToEdit.title || '',
        definition: glossaryItemToEdit.definition || '',
      });
    } else {
      resetForm();
    }
  }, [glossaryItemToEdit]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ title: '', definition: '' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData, resetForm);
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-2xl mb-4 text-center">
          {glossaryItemToEdit
            ? 'Modifier la définition'
            : 'Ajouter une définition'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="label">Titre</label>
            <InputShared
              type="text"
              name="title"
              className="input input-bordered w-full"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Titre de la définition"
            />
          </div>
          <div className="mb-2">
            <label className="label">Définition</label>
            <textarea
              name="definition"
              className="textarea textarea-bordered w-full"
              value={formData.definition}
              onChange={handleInputChange}
              placeholder="Définition"
            />
          </div>
          <div className="modal-action">
            <CloseButton onClick={onClose} />
            <Button type="submit" className="bg-tertiary rounded-lg py-2 px-3">
              {glossaryItemToEdit ? 'Sauvegarder' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModalGlossary;
