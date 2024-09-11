import { Button } from '@/components/shared/Button.components';
import InputShared from '@/components/shared/InputShared.component';
import Routes from '@/enums/routes.enum';
import { Course } from '@/interfaces/course.interface';
import { ERROR_MESSAGES } from '@/utils/messages.utils';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        console.log('Données à envoyer:', formData);
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
console.log('formData', formData);
  return (
    <dialog
      id="edit_course_modal"
      className={`modal ${isOpen ? 'modal-open' : ''}`}
    >
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-2xl mb-4 text-center">
          {courseToEdit ? 'Modifier le cours' : 'Ajouter un cours'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="label">Titre principal</label>
            <InputShared
              type="text"
              name="mainTitle"
              className="input input-bordered w-full"
              value={formData.mainTitle}
              onChange={handleInputChange}
              placeholder={'Titre'}
            />
          </div>
          <div className="mb-2">
            <label className="label">Description</label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="mb-2">
            <label className="label">Contenu</label>
            <textarea
              name="content"
              className="textarea textarea-bordered w-full"
              value={formData.content}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="mb-2">
            <label className="label">Image</label>
            <InputShared
              type="text"
              name="img"
              className="input input-bordered w-full"
              value={formData.img}
              onChange={handleInputChange}
              placeholder={'Image du cours'}
            />
          </div>
          <div className="mb-2">
            <label className="label">Catégorie</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="select select-bordered w-full mb-2"
            >
              <option value="" disabled>
                Sélectionnez une catégorie
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="label">Difficulté</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="select select-bordered w-full mb-2"
            >
              <option value="" disabled>
                Sélectionnez une difficulté
              </option>
              {difficulties.map((difficulty, index) => (
                <option key={index} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
          
          <div className="modal-action">
            <button
              type="submit"
              className="btn bg-button text-white hover:bg-black"
            >
              {courseToEdit ? 'Sauvegarder' : 'Ajouter'}
            </button>
            <Button
              className="btn hover:bg-black"
              onClick={onClose}
            >
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModalCourse;
