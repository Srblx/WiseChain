// Libs React
import { ChangeEvent, FormEvent, useState } from 'react';

// Icons
import { IoMdMail } from 'react-icons/io';

// Components
import Button from '@/components/shared/auth/BtnSubmit.component';
import Input from '@/components/shared/auth/Input.component';
import { notifyForgotPassword } from '@/validators/auth.validator';
import axios from 'axios';
import { inputClassName } from './FormSignup.component';

function FormResetPassword() {
  const [mail, setMail] = useState('');

  const handleMailResetPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  const handleSubmitResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/send-email', {
        name,
        mail,
        onmessage,
      });
  
      if (res.status === 200) {
        alert('Email envoyé avec succès');
        // Réinitialisez le formulaire
      } else {
        alert("Erreur lors de l'envoi de l'email");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi de l'email");
    }
    notifyForgotPassword(mail);
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
