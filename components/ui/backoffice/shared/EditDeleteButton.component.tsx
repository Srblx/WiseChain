// React icons
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

interface EditDeleteButtonProps {
    id: string;
    onEdit: () => void;
    onDelete: () => void;
}

const EditDeleteButton = ({ id, onDelete, onEdit }: EditDeleteButtonProps) => (
    <div className="flex items-center space-x-4 justify-center">
    <BiEditAlt
      color="blue"
      size={'1.3rem'}
      onClick={() => onEdit()}
    />
    <MdDelete
      color="red"
      size={'1.2rem'}
      onClick={() => onDelete()}
    />
  </div>
);

export default EditDeleteButton;