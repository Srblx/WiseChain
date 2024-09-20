// Components
import InputShared from '@/components/shared/InputShared.component';
import Label from '@/components/shared/Label.component';
import Textarea from '@/components/ui/backoffice/shared/Textarea.component';

// React libs
import React from 'react';


interface GlossaryFormProps {
  title: string;
  definition: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const GlossaryForm: React.FC<GlossaryFormProps> = ({ title, definition, onChange }) => {
  return (
    <>
      <Label htmlFor="title">Titre</Label>
      <InputShared
        name="title"
        value={title}
        onChange={onChange}
        placeholder="Titre du terme"
      />
      <Label htmlFor="definition">Définition</Label>
      <Textarea
        rows={4}
        name="definition"
        value={definition}
        onChange={onChange}
        placeholder="Définition du terme"
      />
    </>
  );
};

export default GlossaryForm;