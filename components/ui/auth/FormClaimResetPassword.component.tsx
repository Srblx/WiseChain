// Libs React
import { ChangeEvent, useState } from 'react';

// Icons
import { IoMdMail } from 'react-icons/io';

// Components
import { checkEmailExists } from '@/app/api/resetPassword/route';
import ButtonSubmit from '@/components/shared/auth/BtnSubmit.component';
import Input from '@/components/shared/auth/Input.component';
import { compilerResetPasswordTemplate, sendMail } from '@/lib/mail';
import { ToastContainer, toast } from 'react-toastify';
import { inputClassName } from './FormSignup.component';

function ClaimResetPasswordPage() {
  const [mail, setMail] = useState('');

  const handleMailResetPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  const sendMailInfo = async () => {
    try {
      const emailExists = await checkEmailExists(mail);

      if (!emailExists) {
        toast.error("Cette adresse e-mail n'est pas enregistrée.");
        return;
      }

      await sendMail({
        to: `${mail}`,
        name: 'Réinitialisation de mot de passe',
        subject: 'Réinitialisation de mot de passe WiseChain',
        body: await compilerResetPasswordTemplate('http://localhost:3000/'),
      });

      toast.success('E-mail envoyé avec succès');
      setMail('');
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error("Erreur lors de l'envoi de l'email");
    }
  };

  return (
    <>
      <form
        className="w-[90%] space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          sendMailInfo();
        }}
      >
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
        <ButtonSubmit>Envoyer un mail de réinitialisation</ButtonSubmit>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default ClaimResetPasswordPage;
