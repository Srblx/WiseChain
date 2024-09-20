// Libs Next
import Image from 'next/image';

// Libs React
import { useState } from 'react';

// Components
import StepText from '@/components/shared/auth/Paragraph.composent';
import FormResetPassword from './FormClaimResetPassword.component';
import FormSignin from './FormSignin.component';
import FormSignup from './FormSignup.component';

// CSS Module
import formLoginImage from '@/public/img/noDB/form_img.jpeg';

// Enums
import FormStep from '@/enums/formStep.enum';

// Interfaces
import { ModalContentProps } from '@/interfaces/modal.interface';

export default function ModalContent({ onSuccess }: ModalContentProps) {
  const [currentStep, setCurrentStep] = useState(FormStep.LOGIN);

  const renderStep = () => {
    switch (currentStep) {
      case FormStep.LOGIN:
        return (
          <>
            <FormSignin onSuccess={onSuccess} />
            <div className="flex justify-between w-[88%]">
              <StepText onClick={() => setCurrentStep(FormStep.SIGNUP)}>
                Pas de compte ? Créez en un !
              </StepText>
              <StepText onClick={() => setCurrentStep(FormStep.RESET_PASSWORD)}>
                Mot de passe oublié ?
              </StepText>
            </div>
          </>
        );
      case FormStep.SIGNUP:
        return (
          <>
            <FormSignup onSuccess={onSuccess} />
            <StepText onClick={() => setCurrentStep(FormStep.LOGIN)}>
              Déjà un compte ? Connectez-vous !
            </StepText>
          </>
        );
      case FormStep.RESET_PASSWORD:
        return (
          <>
            <FormResetPassword />
            <StepText onClick={() => setCurrentStep(FormStep.LOGIN)}>
              Retour à la connexion
            </StepText>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-base-100 h-screen fixed z-10 top-0 left-0 w-full flex">
      <div className="w-1/2 flex flex-col justify-center items-center relative max-md:w-full">
        <h1 className="absolute top-4 right-4 max-md:left-4 text-2xl font-bold text-tertiary tracking-widest">
          WISECHAIN
        </h1>
        {renderStep()}
      </div>
      <div className="w-1/2 h-full relative max-md:hidden">
        <Image
          src={formLoginImage}
          alt="auth"
          className="h-full w-full object-cover absolute right-0 "
        />
      </div>
    </div>
  );
}
