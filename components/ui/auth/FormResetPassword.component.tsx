import { ChangeEvent, useState } from 'react';
import { IoMdMail } from 'react-icons/io';
import { inputClassName } from './FormSignup.component';

function FormResetPassword() {
  const [mail, setMail] = useState('');

  const handleMailResetPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  return (
    <form className='w-[90%] space-y-5'>
      <p className='text-tertiary text-xl'>
        Réinitialiser le mot de passe
      </p>
      <label className={inputClassName}>
      <IoMdMail />
        <input
          type='mail'
          className='w-full'
          placeholder='E-mail'
          value={mail}
          onChange={handleMailResetPassword}
          required
        />
      </label>
      <button className='btn w-full bg-button hover:!bg-green-500 text-white font-semibold text-lg'>
        Envoyer la demande
      </button>
    </form>
  );
}

export default FormResetPassword;
