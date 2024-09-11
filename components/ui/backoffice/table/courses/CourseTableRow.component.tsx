import EditDeleteButton from '@/components/shared/EditDeleteButton.component';
import { Course } from '@/interfaces/course.interface';

interface CourseTableRowProps {
  course: Course;
  index: number;
  onDelete: (course: Course) => void;
  onEdit: (course: Course) => void;
}

const CourseTableRow = ({
  course,
  index,
  onDelete,
  onEdit,
}: CourseTableRowProps) => {
  const description = course.description || '';
  const content = course.content || '';
  const sequences = course.sequences || [];
  const category = course.category || { name: '' };
  
  return (
    <tr key={course.id} className="text-center">
      <th>{index + 1}</th>
      <td>{course.mainTitle}</td>
      <td>{description.slice(0, 100)}{description.length > 100 ? '...' : ''}</td>
      <td>{content.slice(0, 100)}{content.length > 100 ? '...' : ''}</td>
      {/* <td>{dayjs(course.createdAt).format('DD/MM/YYYY')}</td> */}
      {/* <td>{dayjs(course.updatedAt).format('DD/MM/YYYY')}</td> */}
      <td>{sequences.length}</td>
      <td>{category.name}</td>
      <td>{course.img ? 'Oui' : 'Non'}</td>
      <td>{course.difficulty}</td>
      <td>
        <EditDeleteButton id={course.id}
          onEdit={() => onEdit(course)}
          onDelete={() => onDelete(course)} />
      </td>
    </tr>
  );
};

export default CourseTableRow;
