// Components
import { Button } from '@/components/shared/Button.components';
import EditDeleteButton from '@/components/shared/EditDeleteButton.component';
import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import GenericTable, { Column } from '../GenericTable.component';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal.component';
import ModalCourse from '../modal/ModalCourse.component';
import ModalSequences from '../modal/ModalSequenceCourse.component';
import ModalTools from '../modal/ModalTool.component';

// Enums
import Routes from '@/enums/routes.enum';

// Interfaces
import { Course, Tool } from '@/interfaces/course.interface';

// Utils
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';

// Helpers
import axios from 'axios';

// React Libs
import { FC, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export interface Sequence {
  title: string;
  content: string;
  img?: string;
}

interface CourseTableProps {
  token: string;
}

const CourseTable: FC<CourseTableProps> = ({ token }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpenForAddCourse, setIsModalOpenForAddCourse] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Course | null>(null);
  const [isSequencesModalOpen, setIsSequencesModalOpen] = useState(false);
  const [selectedCourseSequences, setSelectedCourseSequences] = useState<Sequence[]>([]);
  const [isToolsModalOpen, setIsToolsModalOpen] = useState(false);
  const [selectedCourseTools, setSelectedCourseTools] = useState<Tool[]>([]);

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(Routes.CRUD_COURSE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data.courses);
    } catch (error) {
      console.error(ERROR_MESSAGES.ERROR_FETCHING_COURSE, error);
      toast.error(ERROR_MESSAGES.ERROR_FETCHING_COURSE);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleAddOrEditCourse = async (newCourse: Course) => {
    try {
      const url = courseToEdit ? `${Routes.CRUD_COURSE}/${courseToEdit.id}` : Routes.CRUD_COURSE;
      const method = courseToEdit ? 'put' : 'post';
      
      const response = await axios[method](url, newCourse, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (response.status === 200 || response.status === 201) {
        if (courseToEdit) {
          // Mise à jour d'un cours existant
          setCourses(prevCourses => prevCourses.map(course => 
            course.id === courseToEdit.id ? response.data.course : course
          ));
        } else {
          setCourses(prevCourses => [...prevCourses, response.data.course]);
        }
        handleCloseModalForAddCourse();
        toast.success(courseToEdit ? SUCCESS_MESSAGES.COURSE_UPDATED : SUCCESS_MESSAGES.COURSE_ADDED);
      }
    } catch (error) {
      console.error(ERROR_MESSAGES.ADD_COURSE_ERROR, " test ici ", error);
      toast.error(ERROR_MESSAGES.ADD_COURSE_ERROR);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      const response = await axios.delete(`${Routes.CRUD_COURSE}/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== courseId)
        );
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error(
        ERROR_MESSAGES.DELETE_COURSE_ERROR,
        axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : error
      );
    }
  };

  const handleOpenModalForAddCourse = () => {
    setCourseToEdit(null);
    setIsModalOpenForAddCourse(true);
  };

  const handleOpenModalForEditCourse = (course: Course) => {
    setCourseToEdit(course);
    setIsModalOpenForAddCourse(true);
  };

  const handleOpenDeleteModal = (course: Course) => {
    setItemToDelete(course);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      await handleDeleteCourse(itemToDelete.id);
      handleCloseDeleteModal();
    }
  };

  const handleCloseModalForAddCourse = () => setIsModalOpenForAddCourse(false);

  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleOpenSequencesModal = (sequences: Sequence[]) => {
    if (sequences.length === 0) {
      setSelectedCourseSequences([]);
      setIsSequencesModalOpen(true);
    } else {
      setSelectedCourseSequences(sequences);
      setIsSequencesModalOpen(true);
    }
  };

  const handleCloseSequencesModal = () => {
    setIsSequencesModalOpen(false);
    setSelectedCourseSequences([]);
  };

  const handleOpenToolsModal = (tools: Tool[]) => {
    if (tools.length === 0) {
      setSelectedCourseTools([]);
      setIsToolsModalOpen(true);
    } else {
      setSelectedCourseTools(tools);
      setIsToolsModalOpen(true);
    }
  };

  const handleCloseToolsModal = () => {
    setIsToolsModalOpen(false);
    setSelectedCourseTools([]);
  };

  if (isLoading) return <LoadingSpinner />;

  const columns: Column<Course>[] = [
    {
      header: '#',
      render: (course: Course, index?: number) =>
        index !== undefined ? index + 1 : '',
      className: 'min-w-[50px]',
    },
    {
      header: 'Titre du cours',
      render: (course: Course) => course.mainTitle,
      className: 'min-w-[300px]',
    },
    {
      header: 'Description du cours',
      render: (course: Course) => {
        const description = course.description || '';
        return `${description.slice(0, 150)}${description.length > 150 ? '...' : ''}`;
      },
      className: 'min-w-[300px]',
    },
    {
      header: 'Contenu du cours',
      render: (course: Course) => {
        const content = course.content || '';
        return `${content}`;
      },
      className: 'min-w-[500px]',
    },
    {
      header: 'Séquences',
      render: (course: Course) => {
        const sequencesCount = (course.sequences || []).length;
        return sequencesCount > 0 ? (
          <Button
            className="bg-button rounded-lg py-2 px-3 shadow-xs-light"
            onClick={() =>
              handleOpenSequencesModal(
                (course.sequences || []).map((s) => ({
                  title: s.title,
                  content: s.containt,
                  img: s.img || '',
                }))
              )
            }
          >
            Voir les séquences ({sequencesCount})
          </Button>
        ) : (
          <Button
            className="bg-red-500 rounded-lg py-2 px-3 shadow-xs-light"
            onClick={() => handleOpenSequencesModal([])}
          >
            Ajouter des séquences
          </Button>
        );
      },
      className: 'min-w-[150px]',
    },
    {
      header: 'Catégorie',
      render: (course: Course) => course.category.name || '',
      className: 'min-w-[150px]',
    },
    {
      header: 'Image',
      render: (course: Course) => (course.img ? 'Oui' : 'Non'),
      className: 'min-w-[50px]',
    },
    {
      header: 'Outils',
      render: (course: Course) => {
        const toolsCount = (course.tools || []).length;
        return toolsCount > 0 ? (
          <Button
            className="bg-button rounded-lg py-2 px-3 shadow-xs-light"
            onClick={() => handleOpenToolsModal(course.tools)}
          >
            Voir les outils ({toolsCount})
          </Button>
        ) : (
          <Button
            className="bg-red-500 rounded-lg py-2 px-3 shadow-xs-light"
            onClick={() => handleOpenToolsModal([])}
          >
            Ajouter des outils
          </Button>
        );
      },
      className: 'min-w-[150px]',
    },
    {
      header: 'Difficulté',
      render: (course: Course) => course.difficulty,
      className: 'min-w-[50px]',
    },
    {
      header: 'Actions',
      render: (course: Course) => (
        <EditDeleteButton
          id={course.id}
          onEdit={() => handleOpenModalForEditCourse(course)}
          onDelete={() => handleOpenDeleteModal(course)}
        />
      ),
      className: 'min-w-[100px]',
    },
  ];

  return (
    <>
         <GenericTable
        data={courses}
        columns={columns}
        onAdd={handleOpenModalForAddCourse}
        addButtonText="Ajouter un cours"
      />
      <ModalCourse
        isOpen={isModalOpenForAddCourse}
        onClose={handleCloseModalForAddCourse}
        onSubmit={handleAddOrEditCourse}
        courseToEdit={courseToEdit}
        token={token}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title={itemToDelete?.mainTitle || ''}
      />
      <ModalSequences
        isOpen={isSequencesModalOpen}
        onClose={handleCloseSequencesModal}
        sequences={selectedCourseSequences}
      />
      <ModalTools
        isOpen={isToolsModalOpen}
        onClose={handleCloseToolsModal}
        tools={selectedCourseTools}
      />
    </>
  );
};

export default CourseTable;
