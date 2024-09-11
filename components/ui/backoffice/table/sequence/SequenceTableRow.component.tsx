import EditDeleteButton from "@/components/shared/EditDeleteButton.component";
import { Course, Sequence } from "@/interfaces/course.interface";

interface SequenceCourseTableRowProps {
    sequence: Sequence;
    course: Course;
    index: number;
    onDelete: (sequenceId: string) => void;
    onEdit: (sequenceId: string) => void;
}

const SequenceCourseTableRow = ({
    sequence,
    course,
    index,
    onDelete,
    onEdit,
  }: SequenceCourseTableRowProps) => (
    <tr key={sequence.id} className="text-center">
        <th>{index + 1}</th>
        <td>{course.mainTitle}</td>
        <td>{sequence.index}</td>
        <td>{sequence.title}</td>
        <td>{sequence.containt}</td>
        <td>{sequence.img ? 'Oui' : 'Non'}</td>
        <td>
            <EditDeleteButton id={sequence.id} onEdit={onEdit} onDelete={onDelete} />
        </td>
    </tr>
);

export default SequenceCourseTableRow;