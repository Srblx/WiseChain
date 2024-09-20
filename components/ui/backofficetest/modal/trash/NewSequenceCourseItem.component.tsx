import { Button } from '@/components/shared/Button.components';
import InputShared from '@/components/shared/InputShared.component';
import Label from '@/components/shared/Label.component';
import { FC } from 'react';

import Textarea from '@/components/ui/backofficetest/shared/tewt/Textarea.component';

import { MdRemove } from 'react-icons/md';
import { Sequence } from '../../table/CourseTable.component';

interface NewSequenceItemProps {
  sequence: Sequence;
  index: number;
  onChange: (index: number, field: keyof Sequence, value: string) => void;
  onRemove: (index: number) => void;
  showRemoveButton: boolean;
}

const NewSequenceItem: FC<NewSequenceItemProps> = ({
  sequence,
  index,
  onChange,
  onRemove,
  showRemoveButton,
}) => (
  <li className="mb-4">
    <Label htmlFor={`new-sequence-title-${index}`}>Titre de la Séquence</Label>
    <InputShared
      value={sequence.title}
      onChange={(e) => onChange(index, 'title', e.target.value)}
    />
    <Label htmlFor={`new-sequence-content-${index}`}>
      Contenu de la Séquence
    </Label>
    <Textarea
      value={sequence.content}
      onChange={(e) => onChange(index, 'content', e.target.value)}
      rows={5}
    />
    <Label htmlFor={`new-sequence-img-${index}`}>Image de la Séquence</Label>
    <InputShared
      value={sequence.img}
      onChange={(e) => onChange(index, 'img', e.target.value)}
    />
    {showRemoveButton && (
      <Button
        onClick={() => onRemove(index)}
        className="bg-red-500 rounded-lg py-1 px-3 mt-2 flex items-center space-x-2 w-32"
      >
        <MdRemove /> <span>Supprimer</span>
      </Button>
    )}
  </li>
);

export default NewSequenceItem;
