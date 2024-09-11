'use client';

import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
import ConfirmDeleteModal from '@/components/ui/backoffice/modal/ConfirmDeleteModal.component';
import EditCourseModal from '@/components/ui/backoffice/modal/ModalCourse.component';
import ModalUser from '@/components/ui/backoffice/modal/ModalUser.composent';
import TabContent from '@/components/ui/backoffice/TabContent.component';
import AddButton from '@/components/ui/backoffice/table/AddButton.component';
import Roles from '@/enums/roles.enum';
import Routes from '@/enums/routes.enum';
import TypeTab from '@/enums/typesTab.enum';
import useAuth from '@/hooks/useAuth.hook';
import { User } from '@/interfaces/auth/auth.interface';
import { Course } from '@/interfaces/course.interface';
import { ERROR_MESSAGES } from '@/utils/messages.utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

export type TabType =
  | TypeTab.USER
  | TypeTab.COURS
  | TypeTab.SEQUENCE
  | TypeTab.OUTILS
  | TypeTab.QUESTIONNAIRE
  | TypeTab.ARTICLES
  | TypeTab.GLOSSAIRE;

const BackofficePage = () => {
  const router = useRouter();
  const { user, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>(TypeTab.USER);
  const [isModalOpenForAddUser, setIsModalOpenForAddUser] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [itemToDelete, setItemToDelete] = useState<User | Course | null>(null);
  const [itemTypeToDelete, setItemTypeToDelete] = useState<TabType | null>(
    null
  );
  const [isModalOpenForEditCourse, setIsModalOpenForEditCourse] =
    useState(false);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(Routes.CRUD_USERS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error(ERROR_MESSAGES.ERROR_FETCHING_USER, error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

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
    if (user) {
      if (user.roles === Roles.ADMIN && user.is_verified) {
        setIsAuthorized(true);
      } else {
        router.push(Routes.HOME);
      }
    } else {
      router.push(Routes.HOME);
    }
  }, [user, router]);

  useEffect(() => {
    if (isAuthorized) {
      if (activeTab === TypeTab.USER) {
        fetchUsers();
      } else if (activeTab === TypeTab.COURS) {
        fetchCourses();
      }
    }
  }, [activeTab, isAuthorized, fetchUsers, fetchCourses]);

  const handleTabChange = (tab: TabType) => setActiveTab(tab);

  const handleOpenModalForAddUser = () => {
    setUserToEdit(null);
    setIsModalOpenForAddUser(true);
  };

  const handleOpenModalForEditUser = (user: User) => {
    setUserToEdit(user);
    setIsModalOpenForAddUser(true);
  };

  const handleOpenModalForEditCourse = (course: Course) => {
    setCourseToEdit(course);
    setIsModalOpenForAddUser(true);
  };

  const handleCloseModalForAddUser = () => setIsModalOpenForAddUser(false);

  const handleAddOrEditUser = async (newUser: any) => {
    try {
      if (userToEdit) {
        const response = await axios.put(
          `${Routes.CRUD_USERS}/${userToEdit.id}`,
          newUser,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === userToEdit.id ? response.data : user
            )
          );
          handleCloseModalForAddUser();
        }
      } else {
        const response = await axios.post(Routes.CRUD_USERS, newUser, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 201) {
          setUsers((prevUsers) => [...prevUsers, response.data]);
          handleCloseModalForAddUser();
        }
      }
    } catch (error) {
      console.error(
        ERROR_MESSAGES.ADD_USER_ERROR,
        axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : error
      );
    }
  };

  const handleOpenDeleteModal = (user: User) => {
    setItemToDelete(user);
    setItemTypeToDelete(TypeTab.USER);
    setIsDeleteModalOpen(true);
  };

  const handleOpenDeleteModalCourse = (course: Course) => {
    setItemToDelete(course);
    setItemTypeToDelete(TypeTab.COURS);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete && itemTypeToDelete) {
      if (itemTypeToDelete === TypeTab.USER) {
        await handleDeleteUser((itemToDelete as User).id);
      } else if (itemTypeToDelete === TypeTab.COURS) {
        await handleDeleteCourse((itemToDelete as Course).id);
      }
      handleCloseDeleteModal();
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await axios.delete(`${Routes.CRUD_USERS}?id=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error(
        ERROR_MESSAGES.DELETE_USER_ERROR,
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

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthorized) return null;

  const buttonText: Record<TabType, string> = {
    [TypeTab.USER]: 'Ajouter un utilisateur',
    [TypeTab.COURS]: 'Ajouter un cours',
    [TypeTab.SEQUENCE]: 'Ajouter une séquence',
    [TypeTab.OUTILS]: 'Ajouter un outil',
    [TypeTab.QUESTIONNAIRE]: 'Ajouter un questionnaire',
    [TypeTab.ARTICLES]: 'Ajouter un article',
    [TypeTab.GLOSSAIRE]: 'Ajouter une définition',
  };

const handleCloseModalForEditCourse = () => {
    setIsModalOpenForEditCourse(false);
};

const handleUpdateCourse = (updatedCourse: Course) => {
  setCourses((prevCourses) =>
    prevCourses.map((course) =>
      course.id === updatedCourse.id ? updatedCourse : course
    )
  );
};

  return (
    <>
      <div className="text-3xl mt-6 mb-6">
        <h1>BackOffice</h1>
      </div>
      <div className="flex justify-end mt-2">
        <AddButton
          onClick={handleOpenModalForAddUser}
          text={buttonText[activeTab]}
        />
      </div>
      <div role="tablist" className="tabs tabs-lifted">
        {Object.values(TypeTab).map((tab) => (
          <Fragment key={tab}>
            <input
              type="radio"
              name="my_tabs"
              role="tab"
              className="tab text-tab-label"
              aria-label={tab}
              checked={activeTab === tab}
              onChange={() => handleTabChange(tab)}
            />
            <TabContent
              activeTab={activeTab}
              users={users}
              courses={courses}
              onDeleteUser={handleOpenDeleteModal}
              onEditUser={handleOpenModalForEditUser}
              onDeleteCourse={handleOpenDeleteModalCourse}
              onEditCourse={handleOpenModalForEditCourse}
            />
          </Fragment>
        ))}
      </div>
      <ModalUser
        isOpen={isModalOpenForAddUser}
        onClose={handleCloseModalForAddUser}
        onSubmit={handleAddOrEditUser}
        userToEdit={userToEdit}
      />
      {courseToEdit && (
                <EditCourseModal
                    courseToEdit={courseToEdit}
                    isOpen={isModalOpenForEditCourse}
                    onClose={handleCloseModalForEditCourse}
                    onUpdate={handleUpdateCourse}
                    token={token!}
                />
            )}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        itemType={itemTypeToDelete!}
        firstname={
          itemToDelete && 'firstname' in itemToDelete
            ? itemToDelete.firstname
            : ''
        }
        lastname={
          itemToDelete && 'lastname' in itemToDelete
            ? itemToDelete?.lastname
            : ''
        }
        title={
          itemToDelete && 'mainTitle' in itemToDelete
            ? itemToDelete?.mainTitle
            : ''
        }
      />

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default BackofficePage;
