// Interfaces
import EditDeleteButton from "@/components/shared/EditDeleteButton.component";
import { Glossary } from "@/components/ui/glossary/GlossaryList.component";

interface GlossaryTableRowProps {
    glossary: Glossary;
    index: number;
    onDelete: (glossaryId: string) => void;
    onEdit: (glossaryId: string) => void;
}

const GlossaryTableRow = ({ glossary, index, onEdit, onDelete }: GlossaryTableRowProps) => (
    <tr className="text-center" key={glossary.id}>
        <th>{index + 1}</th>
        <td>{glossary.title}</td>
        <td>{glossary.definition}</td>
        <td>{glossary.createdAt}</td>
        <td>
            <EditDeleteButton id={glossary.id} onEdit={onEdit} onDelete={onDelete} />
        </td>
    </tr>
)