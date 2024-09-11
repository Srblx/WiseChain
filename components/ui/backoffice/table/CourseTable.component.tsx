import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import Routes from '@/enums/routes.enum';
import { Course } from '@/interfaces/course.interface';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';
import axios from 'axios';
import { FC, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal.component';
import ModalCourse from '../modal/ModalCourse.component';
import AddButton from './AddButton.component';
import CourseTableHeader from './courses/CourseTableHeaderFooter.component';
import CourseTableRow from './courses/CourseTableRow.component';

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

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(Routes.CRUD_COURSE, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCourses(response.data.course);
    } catch (error) {
      console.error(ERROR_MESSAGES.ERROR_FETCHING_COURSE, error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleAddOrEditCourse = async (
    newCourse: Course,
    resetForm: () => void
  ) => {
    try {
      if (courseToEdit) {
        console.log('courseToEdit', newCourse);
        const response = await axios.put(
          `${Routes.CRUD_COURSE}/${courseToEdit.id}`,
          newCourse,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          await fetchCourses();
          handleCloseModalForAddCourse();
        }
      } else {
        const response = await axios.post(Routes.CRUD_COURSE, newCourse, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 201) {
          await fetchCourses();
          resetForm();
          handleCloseModalForAddCourse();
        }
      }
      toast.success(SUCCESS_MESSAGES.COURSE_UPDATED);
    } catch (error) {
      console.error(
        ERROR_MESSAGES.ADD_COURSE_ERROR,
        axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : error
      );
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      const response = await axios.delete(
        `${Routes.CRUD_COURSE}?id=${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <AddButton
        onClick={handleOpenModalForAddCourse}
        text={'Ajouter un cours'}
      />
      <div className="overflow-x-auto h-[730px]">
        <table className="table table-sm table-pin-rows table-pin-cols bg-gray-600 ">
          <CourseTableHeader>
            {courses.map((course, index) => (
              <CourseTableRow
                key={course.id}
                course={course}
                index={index}
                onDelete={() => handleOpenDeleteModal(course)}
                onEdit={() => handleOpenModalForEditCourse(course)}
              />
            ))}
          </CourseTableHeader>
        </table>
      </div>
      <ModalCourse
        isOpen={isModalOpenForAddCourse}
        onClose={handleCloseModalForAddCourse}
        onSubmit={(courseData, resetForm) =>
          handleAddOrEditCourse(courseData, resetForm)
        }
        courseToEdit={courseToEdit}
        token={token}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title={itemToDelete?.mainTitle || ''}
      />
    </>
  );
};

export default CourseTable;
