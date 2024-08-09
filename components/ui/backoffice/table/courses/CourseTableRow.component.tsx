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
}: CourseTableRowProps) => (
  <tr key={course.id} className="text-center">
    <th>{index + 1}</th>
    <td>{course.main_title}</td>
    <td>{course.description.slice(0, 100)}...</td>
    <td>{course.content.slice(0, 100)}...</td>
    {/* <td>{dayjs(course.createdAt).format('DD/MM/YYYY')}</td> */}
    {/* <td>{dayjs(course.updatedAt).format('DD/MM/YYYY')}</td> */}
    <td>{course.sequences.length}</td>
    <td>{course.category.name}</td>
    <td>{course.img ? 'Oui' : 'Non'}</td>
    <td>{course.difficulty}</td>
    <td>
      <EditDeleteButton id={course.id}
        onEdit={() => onEdit(course)}
        onDelete={() => onDelete(course)} />
    </td>
  </tr>
);

export default CourseTableRow;
