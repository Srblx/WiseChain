// Libs React
import { ChangeEvent, FormEvent, useState } from 'react';

// Icons
import { IoMdMail } from 'react-icons/io';

// Components
import Button from '@/components/shared/auth/btn-submit.component';
import Input from '@/components/shared/auth/input.component';
import { inputClassName } from './FormSignup.component';

function FormResetPassword() {
  const [mail, setMail] = useState('');

  const handleMailResetPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  const handleSubmitResetPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('mail : ', mail);
  };

  return (
    <form className="w-[90%] space-y-5" onSubmit={handleSubmitResetPassword}>
      <p className="text-tertiary text-xl">Réinitialiser le mot de passe</p>
      <label className={inputClassName}>
        <IoMdMail />
        <Input
          type="mail"
          placeholder="E-mail"
          value={mail}
          onChange={handleMailResetPassword}
          required
        />
      </label>
      <Button>Envoyer un mail de réinitialisation</Button>
    </form>
  );
}

export default FormResetPassword;
