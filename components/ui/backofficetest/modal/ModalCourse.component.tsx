import { Button } from '@/components/shared/Button.components';
import InputShared from '@/components/shared/InputShared.component';
import Label from '@/components/shared/Label.component';
import Routes from '@/enums/routes.enum';
import { Course } from '@/interfaces/course.interface';
import { ERROR_MESSAGES } from '@/utils/messages.utils';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from '../shared/CategoryDifficultySelect.component';
import { CloseButton } from '../shared/CloseButton.component';
import Textarea from '../shared/tewt/Textarea.component';

interface ModalCourseProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedCourse: Course, resetForm: () => void) => void;
  courseToEdit?: Course | null;
  token: string;
}

interface Category {
  id: string;
  name: string;
}

const ModalCourse: FC<ModalCourseProps> = ({
  isOpen,
  onClose,
  onSubmit,
  courseToEdit,
  token,
}) => {
  const [formData, setFormData] = useState({
    mainTitle: '',
    description: '',
    content: '',
    img: '',
    category: '',
    difficulty: '',
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const difficulties = ['Facile', 'Technique', 'Complexe'];

  useEffect(() => {
    if (courseToEdit) {
      setFormData({
        mainTitle: courseToEdit.mainTitle || '',
        description: courseToEdit.description || '',
        content: courseToEdit.content || '',
        img: courseToEdit.img || '',
        category: courseToEdit.category.name || '',
        difficulty: courseToEdit.difficulty || '',
      });
    } else {
      resetForm();
    }
  }, [courseToEdit]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/backoffice/categories', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      mainTitle: '',
      description: '',
      content: '',
      img: '',
      category: '',
      difficulty: '',
    });
  };

  const difficultyOptions = difficulties.map((difficulty) => ({
    id: difficulty,
    name: difficulty,
  }));

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      let response;
      if (courseToEdit) {
        response = await axios.put(
          `${Routes.CRUD_COURSE}/${courseToEdit.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Cours mis à jour avec succès');
      } else {
        response = await axios.post(Routes.CRUD_COURSE, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Cours ajouté avec succès');
      }

      if (response.status === 200 || response.status === 201) {
        onSubmit(
          response.data.course || response.data.updatedCourse,
          resetForm
        );
        onClose();
      }
    } catch (error) {
      console.error(
        ERROR_MESSAGES.ERROR_UPDATE_COURSE,
        axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : error
      );
      toast.error('Une erreur est survenue lors de la soumission du cours');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog
      id="edit_course_modal"
      className={`modal ${isOpen ? 'modal-open' : ''}`}
    >
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-2xl mb-4 text-center">
          {courseToEdit ? 'Modifier le cours' : 'Ajouter un cours'}
        </h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-2">
            <Label htmlFor="mainTitle">Titre principal</Label>
            <InputShared
              type="text"
              name="mainTitle"
              className="input input-bordered w-full"
              value={formData.mainTitle}
              onChange={handleInputChange}
              placeholder="Titre"
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              placeholder="Description du cours"
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="content">Contenu</Label>
            <Textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={5}
              placeholder="Contenu du cours"
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="img">Image</Label>
            <InputShared
              type="text"
              name="img"
              className="input input-bordered w-full"
              value={formData.img}
              onChange={handleInputChange}
              placeholder="Image du cours"
            />
          </div>
          <div className="mb-2">
            <Select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              options={categories}
              label="Catégorie"
              placeholder="Sélectionnez une catégorie"
            />
          </div>
          <div className="mb-2">
            <Select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              options={difficultyOptions}
              label="Difficulté"
              placeholder="Sélectionnez une difficulté"
            />
          </div>

          <div className="modal-action">
            <CloseButton onClick={onClose} />
            <Button
              className="bg-green-500 rounded-lg py-2 px-3"
              onClick={handleSubmit}
            >
              {courseToEdit ? 'Sauvegarder' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModalCourse;
