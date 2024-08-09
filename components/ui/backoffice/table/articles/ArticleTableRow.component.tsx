import EditDeleteButton from '@/components/shared/EditDeleteButton.component';
import { Articles } from '@/interfaces/article.interface';

interface ArticleTableRowProps {
  article: Articles;
  index: number;
  onDelete: (articleId: string) => void;
  onEdit: (articleId: string) => void;
}

const ArticlesTableRow = ({
  article,
  index,
  onEdit,
  onDelete,
}: ArticleTableRowProps) => (
  <tr className="text-lg text-center">
    <th>{index + 1}</th>
    <td>{article.title}</td>
    <td>{article.summary}</td>
    <td>{article.img}</td>
    <td>
      {article.sequence_article.map((sequence) => {
        return (
          <div key={sequence.id}>
            <div>{sequence.title}</div>
            <div>{sequence.containt}</div>
            <div>{sequence.img}</div>
          </div>
        );
      })}
    </td>
    <td>{article.category.name}</td>
    <td>{article.created_at}</td>
    <td>
      <EditDeleteButton id={article.id} onEdit={onEdit} onDelete={onDelete} />
    </td>
  </tr>
);

export default ArticlesTableRow;
