import { Button } from '@/components/shared/Button.components';
import InputShared from '@/components/shared/InputShared.component';
import Label from '@/components/shared/Label.component';
import { Tool } from '@/interfaces/course.interface';
import { FC } from 'react';
import { MdRemove } from 'react-icons/md';



interface NewToolItemProps {
  tool: Tool;
  index: number;
  onChange: (index: number, field: keyof Tool, value: string) => void;
  onRemove: (index: number) => void;
  showRemoveButton: boolean;
}

const NewToolItem: FC<NewToolItemProps> = ({ tool, index, onChange, onRemove, showRemoveButton }) => (
  <li className="flex flex-col mb-3">
    <div className="flex flex-col">
      <Label htmlFor="Tool name">Nom de l'outil</Label>
      <InputShared
        value={tool.name}
        onChange={(e) => onChange(index, 'name', e.target.value)}
      />
      <Label htmlFor="Tool link">Lien de l'outil</Label>
      <InputShared
        value={tool.link}
        onChange={(e) => onChange(index, 'link', e.target.value)}
      />
      <Label htmlFor="Tool img">Image de l'outil</Label>
      <InputShared
        value={tool.img}
        onChange={(e) => onChange(index, 'img', e.target.value)}
      />
      {showRemoveButton && (
        <Button
          onClick={() => onRemove(index)}
          className="bg-red-500 rounded-lg py-2 px-3 mt-2 flex items-center space-x-2 w-32"
        >
          <MdRemove /> <span>Supprimer</span>
        </Button>
      )}
    </div>
  </li>
);

export default NewToolItem;