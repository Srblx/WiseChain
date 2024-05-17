import FormStep from '@/enums/formStep.emun';
import Image from 'next/image';
import { useState } from 'react';
import formLoginImage from '../../../public/img/form_img.jpeg';
import FormResetPassword from './FormResetPassword.component';
import FormSignin from './FormSignin.component';
import FormSignup from './FormSignup.component';

export default function ModalContent() {
  const [currentStep, setCurrentStep] = useState(FormStep.LOGIN);

  const renderStep = () => {
    switch (currentStep) {
      case FormStep.LOGIN:
        return (
          <>
            <FormSignin />
            <div className='flex justify-between w-[88%] max-lg:text-xs mt-2'>
              <p
                className='text-button'
                onClick={() => setCurrentStep(FormStep.SIGNUP)}
              >
                Pas de compte ? Créez en un !
              </p>
              <p
                onClick={() => setCurrentStep(FormStep.RESET_PASSWORD)}
              >
                Mot de passe oublié ?
              </p>
            </div>
          </>
        );
      case FormStep.SIGNUP:
        return (
          <>
            <FormSignup />
            <p
              className='text-button mt-2 max-lg:text-xs'
              onClick={() => setCurrentStep(FormStep.LOGIN)}
            >
              Déjà un compte ? Connectez-vous !
            </p>
          </>
        );
      case FormStep.RESET_PASSWORD:
        return (
          <>
            <FormResetPassword />
            <p
              className='text-button mt-2 max-lg:text-xs'
              onClick={() => setCurrentStep(FormStep.LOGIN)}
            >
              Retour à la connexion
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className='bg-base-100 h-screen fixed z-10 top-0 left-0 w-full flex'>
      <div className='w-1/2 flex flex-col justify-center items-center relative max-md:w-full'>
        <h1 className='absolute top-4 right-4 max-md:left-4 text-2xl font-bold text-tertiary tracking-widest'>
          WISECHAIN
        </h1>
        {renderStep()}
      </div>

      <div className='w-1/2 h-full relative max-md:hidden'>
        <Image
          src={formLoginImage}
          alt='auth'
          className='h-full w-full object-cover absolute right-0 '
        />
      </div>
    </div>
  );
}
