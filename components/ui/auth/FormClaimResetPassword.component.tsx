// Libs React
import { ChangeEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Icons
import { IoMdMail } from 'react-icons/io';

// Components
import ButtonSubmit from '@/components/shared/auth/BtnSubmit.component';
import InputLog from '@/components/shared/auth/Input.component';
import { inputClassName } from './FormSignup.component';

// API
import { checkEmailExists } from '@/app/api/claim-reset-password/route';
import axios from 'axios';

// Enum
import Routes from '@/enums/routes.enum';

// Helpers
import { compilerResetPasswordTemplate, sendMail } from '@/lib/mail';

// Utils
import { ERROR_MESSAGES_FR, SUCCESS_MESSAGES_FR } from '@/utils/messages.utils';

function ClaimResetPasswordPage() {
  const [mail, setMail] = useState('');

  const handleMailResetPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  const sendMailInfo = async () => {
    try {
      const emailExists = await checkEmailExists(mail);

      if (!emailExists) {
        toast.error(ERROR_MESSAGES_FR.MAIL_NOT_FOUND);
        return;
      }

      const response = await axios.post(Routes.GENERATE_TOKEN, { mail });

      await sendMail({
        to: `${mail}`,
        name: 'Réinitialisation de mot de passe',
        subject: 'Réinitialisation de mot de passe WiseChain',
        body: await compilerResetPasswordTemplate(
          `http://localhost:3000/resetPassword?token=${response.data.token}`
        ),
      });

      toast.success(SUCCESS_MESSAGES_FR.MAIL_SEND_RESET_PASSWORD);
      setMail('');
    } catch (error) {
      toast.error(ERROR_MESSAGES_FR.MAIL_NOT_FOUND);
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
          <InputLog
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
