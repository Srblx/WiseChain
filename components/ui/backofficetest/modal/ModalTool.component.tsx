import { Button } from '@/components/shared/Button.components';
import InputShared from '@/components/shared/InputShared.component';
import Label from '@/components/shared/Label.component';
import { CloseButton } from '@/components/ui/backofficetest/shared/CloseButton.component';
import { Tool } from '@/interfaces/course.interface';
import { FC, useEffect, useState } from 'react';
import { MdAdd, MdEdit, MdRemove } from 'react-icons/md';

interface ModalToolsProps {
  isOpen: boolean;
  onClose: () => void;
  tools: Tool[];
}

const ModalTools: FC<ModalToolsProps> = ({ isOpen, onClose, tools }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTools, setEditedTools] = useState<Tool[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTools, setNewTools] = useState<Tool[]>([
    { name: '', link: '', img: '' },
  ]);

  useEffect(() => {
    setEditedTools(tools);
  }, [tools]);

  const handleToolChange = (
    index: number,
    field: keyof Tool,
    value: string
  ) => {
    const newToolsArray = [...editedTools];
    newToolsArray[index] = { ...newToolsArray[index], [field]: value };
    setEditedTools(newToolsArray);
  };

  const handleNewToolChange = (
    index: number,
    field: keyof Tool,
    value: string
  ) => {
    const updatedNewTools = [...newTools];
    updatedNewTools[index] = { ...updatedNewTools[index], [field]: value };
    setNewTools(updatedNewTools);
  };

  const handleAddNewToolField = () => {
    if (newTools.length < 5) {
      setNewTools([...newTools, { name: '', link: '', img: '' }]);
    }
  };

  const handleRemoveNewToolField = (index: number) => {
    const updatedNewTools = newTools.filter((_, i) => i !== index);
    setNewTools(updatedNewTools);
  };

  const handleCancel = () => {
    setEditedTools(tools);
    setIsEditing(false);
    setIsAdding(false);
    setNewTools([{ name: '', link: '', img: '' }]);
  };

  const handleValidate = () => {
    console.log('Outils modifiés:', editedTools);
    setIsEditing(false);
  };

  const handleAddTools = () => {
    setEditedTools([...editedTools, ...newTools]);
    setNewTools([{ name: '', link: '', img: '' }]);
    setIsAdding(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-blueDark p-6 rounded-lg shadow-lg w-9/12 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl mb-4">Outils du cours</h2>
        <ul className="space-y-4">
          {editedTools.length > 0 ? (
            editedTools.map((tool, index) => (
              <li key={tool.id || index} className="flex flex-col mb-3">
                <div className="flex items-center space-x-4">
                  <img
                    src={tool.img}
                    alt={tool.name}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div className="flex-1">
                    <Label htmlFor="Tool name">Nom de l'outil</Label>
                    <InputShared
                      value={tool.name}
                      onChange={(e) =>
                        handleToolChange(index, 'name', e.target.value)
                      }
                      disabled={!isEditing}
                      className={`${!isEditing ? 'cursor-not-allowed' : ''}`}
                    />
                    <Label htmlFor="Tool link">Lien de l'outil</Label>
                    <InputShared
                      value={tool.link}
                      onChange={(e) =>
                        handleToolChange(index, 'link', e.target.value)
                      }
                      disabled={!isEditing}
                      className={`${!isEditing ? 'cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-white mb-4">
              Aucun outil disponible pour ce cours.
            </p>
          )}
          {isAdding &&
            newTools.map((tool, index) => (
              <li key={index} className="flex flex-col mb-3">
                <div className="flex flex-col">
                  <Label htmlFor="Tool name">Nom de l'outil</Label>
                  <InputShared
                    value={tool.name}
                    onChange={(e) =>
                      handleNewToolChange(index, 'name', e.target.value)
                    }
                  />
                  <Label htmlFor="Tool link">Lien de l'outil</Label>
                  <InputShared
                    value={tool.link}
                    onChange={(e) =>
                      handleNewToolChange(index, 'link', e.target.value)
                    }
                  />
                  <Label htmlFor="Tool img">Image de l'outil</Label>
                  <InputShared
                    value={tool.img}
                    onChange={(e) =>
                      handleNewToolChange(index, 'img', e.target.value)
                    }
                  />
                  {newTools.length > 1 && (
                    <Button
                      onClick={() => handleRemoveNewToolField(index)}
                      className="bg-red-500 rounded-lg py-2 px-3 mt-2 flex items-center space-x-2 w-32"
                    >
                      <MdRemove /> <span>Supprimer</span>
                    </Button>
                  )}
                </div>
              </li>
            ))}
        </ul>

        {isAdding && newTools.length < 5 && (
          <Button
            onClick={handleAddNewToolField}
            className="bg-tertiary rounded-lg py-2 px-3 flex items-center space-x-2 mt-3 mb-6 "
          >
            <MdAdd /> <span>Ajouter un autre outil</span>
          </Button>
        )}

        {/* Partie modifiée */}
        <div className="flex justify-between">
          {isAdding || isEditing ? (
            <>
              <Button
                onClick={handleCancel}
                className="bg-red-500 rounded-lg py-2 px-3"
              >
                Annuler
              </Button>
              <Button
                onClick={isAdding ? handleAddTools : handleValidate}
                className="bg-green-500 rounded-lg py-2 px-3"
              >
                Valider
              </Button>
            </>
          ) : (
            <>
              <CloseButton onClick={onClose} />
              {editedTools.length < 5 && (
                <Button
                  onClick={() => setIsAdding(true)}
                  className="bg-tertiary rounded-lg py-2 px-3 flex items-center space-x-2 mt-4"
                >
                  <MdAdd /> <span>Ajouter des outils</span>
                </Button>
              )}
              {editedTools.length > 0 && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-green-500 rounded-lg py-2 px-3 flex items-center space-x-2"
                >
                  <MdEdit /> <span>Modifier</span>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalTools;
