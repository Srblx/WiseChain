import Routes from '@/enums/routes.enum';
import { Course } from '@/interfaces/course.interface';
import { ERROR_MESSAGES } from '@/utils/messages.utils';
import axios from 'axios';
import React, { useState } from 'react';

interface EditCourseModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedCourse: Course) => void;
  token: string;
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({
  course,
  isOpen,
  onClose,
  onUpdate,
  token,
}) => {
  const [mainTitle, setMainTitle] = useState(course.main_title);
  const [description, setDescription] = useState(course.description);
  const [content, setContent] = useState(course.content);
  const [img, setImg] = useState(course.img);
  const [category, setCategory] = useState(course.category);
  const [difficulty, setDifficulty] = useState(course.difficulty);

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${Routes.CRUD_COURSE}/${course.id}`,
        {
          main_title: mainTitle,
          description,
          content,
          img,
          category,
          difficulty,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        onUpdate(response.data.updateCourse);
        onClose();
      }
    } catch (error) {
      console.error(
        ERROR_MESSAGES.ERROR_UPDATE_COURSE,
        axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : error
      );
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id="my_modal_6"
        className="modal-toggle"
        checked={isOpen}
        readOnly
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Modifier le cours</h3>
          <div className="py-4">
            <label className="label">Titre principal</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={mainTitle}
              onChange={(e) => setMainTitle(e.target.value)}
            />

            <label className="label">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <label className="label">Contenu</label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <label className="label">Image</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />

            <label className="label">Catégorie</label>
            {/* <input
              type="text"
              className="input input-bordered w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            /> */}

            <label className="label">Difficulté</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            />
          </div>

          <div className="modal-action">
            <button className="btn" onClick={handleSubmit}>
              Sauvegarder
            </button>
            <label htmlFor="my_modal_6" className="btn" onClick={onClose}>
              Fermer
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourseModal;
