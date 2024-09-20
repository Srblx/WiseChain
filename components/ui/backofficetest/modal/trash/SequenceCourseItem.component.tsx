import InputShared from '@/components/shared/InputShared.component';
import Label from '@/components/shared/Label.component';
import Textarea from '@/components/ui/backofficetest/shared/tewt/Textarea.component';

import { FC } from 'react';
import { Sequence } from '../../table/CourseTable.component';


interface SequenceItemProps {
  sequence: Sequence;
  index: number;
  isEditing: boolean;
  onChange: (index: number, field: keyof Sequence, value: string) => void;
}

const SequenceItem: FC<SequenceItemProps> = ({ sequence, index, isEditing, onChange }) => (
  <li className="mb-4">
    <Label htmlFor={`sequence-title-${index}`}>Titre de la Séquence {index + 1}</Label>
    <InputShared
      id={`sequence-title-${index}`}
      value={sequence.title}
      onChange={(e) => onChange(index, 'title', e.target.value)}
      disabled={!isEditing}
      className={`${!isEditing ? 'cursor-not-allowed' : ''}`}
    />
    <Textarea
      value={sequence.content}
      onChange={(e) => onChange(index, 'content', e.target.value)}
      disabled={!isEditing}
      rows={5}
      className={`${!isEditing ? 'cursor-not-allowed' : ''}`}
    />
    {sequence.img && (
      <img src={`/public/img/${sequence.img}`} alt={sequence.title} className="mt-2 max-w-full h-auto" />
    )}
  </li>
);

export default SequenceItem;