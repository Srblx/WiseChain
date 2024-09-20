import { FC } from 'react';

import InputShared from '@/components/shared/InputShared.component';
import Label from '@/components/shared/Label.component';
import { Tool } from '@/interfaces/course.interface';

export const MAX_TOOLS = 5;

interface ToolItemProps {
  tool: Tool;
  index: number;
  isEditing: boolean;
  onChange: (index: number, field: keyof Tool, value: string) => void;
}

const ToolItem: FC<ToolItemProps> = ({ tool, index, isEditing, onChange }) => (
  <li className="flex flex-col mb-3">
    <div className="flex items-center space-x-4">
      <img src={tool.img} alt={tool.name} className="w-12 h-12 rounded-lg" />
      <div className="flex-1">
        <Label htmlFor="Tool name">Nom de l'outil</Label>
        <InputShared
          value={tool.name}
          onChange={(e) => onChange(index, 'name', e.target.value)}
          disabled={!isEditing}
          className={`${!isEditing ? 'cursor-not-allowed' : ''}`}
        />
        <Label htmlFor="Tool link">Lien de l'outil</Label>
        <InputShared
          value={tool.link}
          onChange={(e) => onChange(index, 'link', e.target.value)}
          disabled={!isEditing}
          className={`${!isEditing ? 'cursor-not-allowed' : ''}`}
        />
      </div>
    </div>
  </li>
);

export default ToolItem;