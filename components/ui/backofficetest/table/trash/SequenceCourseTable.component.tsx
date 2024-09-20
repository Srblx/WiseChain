// import axios from 'axios';
// import { FC, useCallback, useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

// import EditDeleteButton from '@/components/shared/EditDeleteButton.component';
// import LoadingSpinner from '@/components/shared/LoadingSpinner.component';
// import Routes from '@/enums/routes.enum';
// import { Sequence } from '@/interfaces/course.interface';
// import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';
// import ConfirmDeleteModal from '../modal/ConfirmDeleteModal.component';
// // import ModalSequence from '../modal/ModalSequence.component';
// import GenericTable, { Column } from '../GenericTable.component';

// interface SequenceCourseTableProps {
//   token: string;
//   courseId: string;
// }

// const SequenceCourseTable: FC<SequenceCourseTableProps> = ({
//   token,
//   courseId,
// }) => {
//   const [sequences, setSequences] = useState<Sequence[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [sequenceToEdit, setSequenceToEdit] = useState<Sequence | null>(null);
//   const [itemToDelete, setItemToDelete] = useState<Sequence | null>(null);

//   const fetchSequences = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(
//         `${Routes.CRUD_SEQUENCE_COURSE}/${courseId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
  
//       console.log('Response data:', response.data);
  
//       const courses = response.data;
  
//       const allSequences = Array.isArray(courses)
//         ? courses.flatMap((course: any) => course.sequences || []) 
//         : [];
  
//       setSequences(allSequences);
//     } catch (error) {
//       console.error(ERROR_MESSAGES.ERROR_FETCHING_SEQUENCE, error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [token, courseId]);

//   useEffect(() => {
//     fetchSequences();
//   }, [fetchSequences]);

//   const handleAddOrEditSequence = async (
//     newSequence: Sequence,
//     resetForm: () => void
//   ) => {
//     try {
//       if (sequenceToEdit) {
//         const response = await axios.put(
//           `${Routes.CRUD_SEQUENCE_COURSE}/${sequenceToEdit.course_id}`,
//           newSequence,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         if (response.status === 200) {
//           await fetchSequences();
//           handleCloseModal();
//         }
//       } else {
//         const response = await axios.post(
//           Routes.CRUD_SEQUENCE_COURSE,
//           { ...newSequence, course_id: courseId },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         if (response.status === 201) {
//           await fetchSequences();
//           resetForm();
//           handleCloseModal();
//         }
//       }
//       toast.success(SUCCESS_MESSAGES.SEQUENCE_UPDATED);
//     } catch (error) {
//       console.error(
//         ERROR_MESSAGES.ADD_SEQUENCE_ERROR,
//         axios.isAxiosError(error)
//           ? error.response?.data?.error || error.message
//           : error
//       );
//     }
//   };

//   const handleDeleteSequence = async (sequenceId: string) => {
//     try {
//       const response = await axios.delete(
//         `${Routes.CRUD_SEQUENCE_COURSE}/${sequenceId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (response.status === 200) {
//         setSequences((prevSequences) =>
//           prevSequences.filter((sequence) => sequence.course_id !== sequenceId)
//         );
//         handleCloseDeleteModal();
//       }
//     } catch (error) {
//       console.error(
//         ERROR_MESSAGES.DELETE_SEQUENCE_ERROR,
//         axios.isAxiosError(error)
//           ? error.response?.data?.error || error.message
//           : error
//       );
//     }
//   };

//   const handleOpenModal = () => {
//     setSequenceToEdit(null);
//     setIsModalOpen(true);
//   };

//   const handleOpenModalForEdit = (sequence: Sequence) => {
//     setSequenceToEdit(sequence);
//     setIsModalOpen(true);
//   };

//   const handleOpenDeleteModal = (sequence: Sequence) => {
//     setItemToDelete(sequence);
//     setIsDeleteModalOpen(true);
//   };

//   const handleCloseModal = () => setIsModalOpen(false);
//   const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

//   if (isLoading) return <LoadingSpinner />;

//   const columns: Column<Sequence>[] = [
//     {
//       header: '#',
//       render: (sequence: Sequence, index?: number) =>
//         index !== undefined ? index + 1 : '',
//     },
//     {
//       header: 'Index',
//       render: (sequence: Sequence) => sequence.index.toString(),
//     },
//     { header: 'Titre', render: (sequence: Sequence) => sequence.title },
//     {
//       header: 'Contenu',
//       render: (sequence: Sequence) =>
//         sequence.containt.slice(0, 100) +
//         (sequence.containt.length > 100 ? '...' : ''),
//     },
//     {
//       header: 'Image',
//       render: (sequence: Sequence) => (sequence.img ? 'Oui' : 'Non'),
//     },
//     {
//       header: 'Actions',
//       render: (sequence: Sequence) => (
//         <EditDeleteButton
//           id={sequence.course_id?.toString() || ''}
//           onEdit={() => handleOpenModalForEdit(sequence)}
//           onDelete={() => handleOpenDeleteModal(sequence)}
//         />
//       ),
//     },
//   ];

//   return (
//     <>
//       <GenericTable
//         data={sequences}
//         columns={columns}
//         onAdd={handleOpenModal}
//         addButtonText="Ajouter une séquence"
//       />
//       {/* <ModalSequence
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onSubmit={handleAddOrEditSequence}
//         sequenceToEdit={sequenceToEdit}
//       /> */}
//       <ConfirmDeleteModal
//         isOpen={isDeleteModalOpen}
//         onClose={handleCloseDeleteModal}
//         onConfirm={() => handleDeleteSequence(itemToDelete?.course_id || '')}
//         title={itemToDelete?.title || ''}
//       />
//     </>
//   );
// };

// export default SequenceCourseTable;
