// Components
import { Button } from '@/components/shared/Button.components';

interface AddButtonProps {
  onClick: () => void;
  text: string;
}

const AddButton = ({ onClick, text }: AddButtonProps) => (
  <Button className="bg-button rounded-md p-3" onClick={onClick}>
    {text}
  </Button>
);

export default AddButton;
