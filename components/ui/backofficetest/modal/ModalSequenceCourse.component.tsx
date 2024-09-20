import { Button } from '@/components/shared/Button.components';
import InputShared from '@/components/shared/InputShared.component';
import Label from '@/components/shared/Label.component';
import { FC, useEffect, useState } from 'react';
import { MdAdd, MdClose, MdRemove } from 'react-icons/md';
import Textarea from '../shared/tewt/Textarea.component';

interface Sequence {
  title: string;
  content: string;
  img?: string;
}

interface ModalSequencesProps {
  isOpen: boolean;
  onClose: () => void;
  sequences: Sequence[];
}

const ModalSequences: FC<ModalSequencesProps> = ({
  isOpen,
  onClose,
  sequences,
}) => {
  if (!isOpen) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [editedSequences, setEditedSequences] = useState<Sequence[]>([]);
  const [isAdding, setIsAdding] = useState(false); // Gérer l'ajout de nouvelles séquences
  const [newSequences, setNewSequences] = useState<Sequence[]>([
    { title: '', content: '', img: '' },
  ]); // Commencer avec 1 séquence à ajouter

  useEffect(() => {
    setEditedSequences(sequences);
  }, [sequences]);

  const getImageUrl = (imgPath?: string) => {
    if (!imgPath) return '';
    return `/public/img/${imgPath}`;
  };

  const handleSequenceChange = (
    index: number,
    field: keyof Sequence,
    value: string
  ) => {
    const newSequences = [...editedSequences];
    newSequences[index] = { ...newSequences[index], [field]: value };
    setEditedSequences(newSequences);
  };

  const handleNewSequenceChange = (
    index: number,
    field: keyof Sequence,
    value: string
  ) => {
    const updatedNewSequences = [...newSequences];
    updatedNewSequences[index] = {
      ...updatedNewSequences[index],
      [field]: value,
    };
    setNewSequences(updatedNewSequences);
  };

  const handleAddNewSequenceField = () => {
    setNewSequences([...newSequences, { title: '', content: '', img: '' }]);
  };

  const handleRemoveNewSequenceField = (index: number) => {
    const updatedNewSequences = newSequences.filter((_, i) => i !== index);
    setNewSequences(updatedNewSequences);
  };

  const handleCancel = () => {
    setEditedSequences(sequences);
    setIsEditing(false);
    setIsAdding(false);
    setNewSequences([{ title: '', content: '', img: '' }]); // Réinitialiser à une seule séquence vide
  };

  const handleValidate = () => {
    console.log('Séquences modifiées:', editedSequences);
    setIsEditing(false);
  };

  const handleAddSequences = () => {
    setEditedSequences([...editedSequences, ...newSequences]);
    setNewSequences([{ title: '', content: '', img: '' }]); // Réinitialiser à une seule séquence vide
    setIsAdding(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-blueDark p-6 rounded-md shadow-lg w-9/12 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl mb-4">Séquences du cours</h2>
        <div className="space-y-4 mb-6">
          {editedSequences.length > 0 ? (
            editedSequences.map((sequence, index) => (
              <div key={index} className="flex flex-col mb-6">
                <Label htmlFor="Sequence title">
                  Titre de la Séquence {index + 1}
                </Label>
                <InputShared
                  value={sequence.title}
                  onChange={(e) =>
                    handleSequenceChange(index, 'title', e.target.value)
                  }
                  disabled={!isEditing}
                  className={`${!isEditing ? 'cursor-not-allowed' : ''}`}
                />
                <Label htmlFor="Sequence content">
                  Contenu de la Séquence {index + 1}
                </Label>
                <Textarea
                  value={sequence.content}
                  onChange={(e) =>
                    handleSequenceChange(index, 'content', e.target.value)
                  }
                  disabled={!isEditing}
                  rows={5}
                  className={`${!isEditing ? 'cursor-not-allowed' : ''}`}
                />
                {sequence.img && (
                  <div className="mt-2">
                    <img
                      src={getImageUrl(sequence.img)}
                      alt={`Image de la séquence ${index + 1}`}
                      className="max-w-full h-auto rounded-md shadow-md"
                    />
                    <p>{sequence.img}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-white">
              Aucune séquence disponible pour ce cours.
            </p>
          )}
          {isAdding &&
            newSequences.map((sequence, index) => (
              <div key={index} className="flex flex-col mb-6">
                <Label className="text-gray-300 mb-1" htmlFor="Sequence title">
                  Titre de la Séquence
                </Label>
                <InputShared
                  value={sequence.title}
                  onChange={(e) =>
                    handleNewSequenceChange(index, 'title', e.target.value)
                  }
                  // className="p-2 bg-gray-200 text-gray-800 rounded-md mb-2 w-full"
                />
                <Label
                  className="text-gray-300 mb-1"
                  htmlFor="Sequence content"
                >
                  Contenu de la Séquence
                </Label>
                <textarea
                  value={sequence.content}
                  onChange={(e) =>
                    handleNewSequenceChange(index, 'content', e.target.value)
                  }
                  rows={5}
                  // className="p-2 bg-gray-200 text-gray-800 rounded-md mb-2 w-full"
                />
                <Label className="text-gray-300 mb-1" htmlFor="Sequence img">
                  Image de la Séquence
                </Label>
                <InputShared
                  value={sequence.img}
                  onChange={(e) =>
                    handleNewSequenceChange(index, 'img', e.target.value)
                  }
                  // className="p-2 bg-gray-200 text-gray-800 rounded-md mb-2 w-full"
                />
                {newSequences.length > 1 && (
                  <Button
                    onClick={() => handleRemoveNewSequenceField(index)}
                    className="bg-red-500 rounded-lg py-1 px-3 mt-2 flex items-center space-x-2 w-32"
                  >
                    <MdRemove /> <span>Supprimer</span>
                  </Button>
                )}
              </div>
            ))}
        </div>

        {isAdding && (
          <Button
            onClick={handleAddNewSequenceField}
            className="bg-tertiary rounded-lg py-2 px-3 flex items-center space-x-2 mt-3"
          >
            <MdAdd /> <span>Ajouter une autre séquence</span>
          </Button>
        )}

        <div className="flex justify-between mt-4">
          {isAdding || isEditing ? (
            <>
              <Button
                onClick={handleCancel}
                className="bg-red-500 rounded-lg py-2 px-3"
              >
                Annuler
              </Button>
              <Button
                onClick={isAdding ? handleAddSequences : handleValidate}
                className="bg-green-500 rounded-lg py-2 px-3"
              >
                Valider
              </Button>
            </>
          ) : (
            <>
              <Button
                className="bg-button rounded-lg px-3 flex items-center space-x-2"
                onClick={onClose}
              >
                <MdClose /> Fermer
              </Button>
              <Button
                onClick={() => setIsAdding(true)}
                className="bg-tertiary rounded-lg py-2 px-3 flex items-center space-x-2 mt-4"
              >
                <MdAdd /> <span>Ajouter des séquences</span>
              </Button>
              {editedSequences.length > 0 && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-green-500 rounded-lg py-2 px-3 flex items-center space-x-2"
                >
                  Modifier
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalSequences;
