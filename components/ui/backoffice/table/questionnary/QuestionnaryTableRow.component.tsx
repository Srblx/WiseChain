import EditDeleteButton from '@/components/shared/EditDeleteButton.component';
import {
    Answer,
    Question,
    Questionnary,
} from '@/interfaces/questionnary.interface';

interface QuestionnaryTableRowProps {
  questionnary: Questionnary;
  index: number;
  onDelete: (questionnaryId: string) => void;
  onEdit: (questionnaryId: string) => void;
}

const QuestionnaryTableRow = ({
  questionnary,
  index,
  onDelete,
  onEdit,
}: QuestionnaryTableRowProps) => (
  <tr className="text-center" key={questionnary.id}>
    <th>{index + 1}</th>
    <td>{questionnary.subject}</td>
    <td>{questionnary.creator}</td>
    <td>{new Date(questionnary.createdAt).toLocaleDateString()}</td>
    <td>{new Date(questionnary.updatedAt).toLocaleDateString()}</td>
    <td>
      {questionnary.questions.map((question: Question) => (
        <div key={question.id}>
          <div>{question.title}</div>
          {question.answers.map((answer: Answer) => (
            <div key={answer.id}>
              <span>{answer.answer}</span> -{' '}
              <span>{answer.isCorrect ? 'Correct' : 'Incorrect'}</span>
            </div>
          ))}
        </div>
      ))}
    </td>
    <td>
      <EditDeleteButton
        id={questionnary.id}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </td>
  </tr>
);

export default QuestionnaryTableRow;
