import EditDeleteButton from '@/components/shared/EditDeleteButton.component';
import { Tool } from '@prisma/client';

interface ToolTableRowProps {
  tool: Tool;
  index: number;
  onDelete: (toolId: string) => void;
  onEdit: (toolId: string) => void;
}

const ToolTableRow = ({ tool, index, onDelete, onEdit }: ToolTableRowProps) => (
  <tr key={tool.id} className="text-center">
    <th>{index + 1}</th>
    <td>{tool.name}</td>
    <td>{tool.link}</td>
    <td>{tool.img}</td>
    <td>
      <EditDeleteButton id={tool.id} onEdit={onEdit} onDelete={onDelete} />
    </td>
  </tr>
);

export default ToolTableRow;
