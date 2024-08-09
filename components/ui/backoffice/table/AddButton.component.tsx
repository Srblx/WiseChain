// Components
import { Button } from '@/components/shared/Button.components';

interface AddButtonProps {
  onClick: () => void;
  text: string;
}

const AddButton = ({ onClick, text }: AddButtonProps) => (
  <div className='flex justify-end items-center'>
  <Button className="bg-button rounded-md p-3 mb-3 shadow-sm-light" onClick={onClick}>
    {text}
  </Button>
  </div>
);

export default AddButton;
