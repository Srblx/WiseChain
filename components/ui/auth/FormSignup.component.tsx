// Utils
import {
  useConfirmPasswordVisibility,
  usePasswordVisibility,
} from '@/utils/auth/usePasswordVisibility.utils';
import countries from '@/utils/data/country';
import {
  SignupAction,
  initialState,
  signupReducer,
} from '@/utils/data/signupReducer';
import { ERROR_MESSAGES_FR } from '@/utils/messages.utils';

// Components
import { ButtonIcon } from '@/components/shared/ButtonIcon.component';
import Button from '@/components/shared/auth/BtnSubmit.component';
import InputLog from '@/components/shared/auth/Input.component';

// Libs React
import { FormEvent, useEffect, useReducer, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Icons
import { FaBirthdayCake, FaUser, FaUserSecret } from 'react-icons/fa';
import { FaFlag, FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';

// Validators
import { SignupSchema } from '@/validators/auth.validator';

// Interfaces
import { SignupValidator } from '@/interfaces/auth/auth.interface';
import { FormSignupProps } from '@/interfaces/modal.interface';

// Axios

// Enums
import FormStep from '@/enums/formStep.enum';
import Routes from '@/enums/routes.enum';

// Hooks
import useAuth from '@/hooks/useAuth.hook';

// Mail
import { compilerMailTemplate, sendMail } from '@/lib/mail';

// Helpers

import axios from 'axios';
import * as Yup from 'yup';

// CSS
export const inputClassName = 'input input-bordered flex items-center gap-2';

const FormSignup = ({ onSuccess }: FormSignupProps) => {
  const [state, dispatch] = useReducer<
    React.Reducer<SignupValidator, SignupAction>
  >(signupReducer, initialState);
  const [countriesOptions, setCountriesOptions] = useState<JSX.Element[]>([]);
  const [currentStep, setCurrentStep] = useState(FormStep.CONDITION_OF_USE);
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const { showConfirmPassword, toggleConfirmPasswordVisibility } =
    useConfirmPasswordVisibility();
  const { login } = useAuth();

  const signupData: SignupValidator = {
    firstname: state.firstname,
    lastname: state.lastname,
    pseudo: state.pseudo,
    mail: state.mail,
    password: state.password,
    confirmPassword: state.confirmPassword,
    dateOfBirth: state.dateOfBirth,
    country: state.country,
    is_revoice: state.is_revoice,
    isTermsAccepted: state.isTermsAccepted,
    errorMessage: state.errorMessage,
  };

  const handleSubmitSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.isTermsAccepted) {
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: "Vous devez accepter les conditions d'utilisation.",
      });
      return;
    }
    dispatch({ type: 'SET_ERROR_MESSAGE', payload: '' });

    try {
      await SignupSchema.validate(signupData, { abortEarly: false });

      try {
        const response = await axios.post(Routes.SIGNUP, signupData);

        if (response.status === 201) {
          const { token, user } = response.data;
          login(user, token);

          const mail = signupData.mail;
          const responseSenderMail = await axios.post(Routes.GENERATE_TOKEN, {
            mail,
          });

          await sendMail({
            to: `${mail}`,
            name: 'Verification adresse mail',
            subject: 'Verification adresse mail',
            body: await compilerMailTemplate(
              `http://localhost:3000/verifyMail?token=${responseSenderMail.data.token}`
            ),
          });

          toast.success('Inscription réussie');
          onSuccess();
        } else {
          throw new Error(ERROR_MESSAGES_FR.SIGNUP_FAILED);
        }
      } catch (error) {
        console.error(error);
        let errorMessage = ERROR_MESSAGES_FR.ADD_USER_ERROR;
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 400) {
            errorMessage =
              error.response.data.error || ERROR_MESSAGES_FR.VALIDATE_DATA_ERROR;
          } else if (error.response.status === 409) {
            errorMessage = ERROR_MESSAGES_FR.PSEUDO_OR_MAIL_ALREADY_TAKEN;
          }
        }
        dispatch({ type: 'SET_ERROR_MESSAGE', payload: errorMessage });
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        toast.error(error.inner[0].message);
        return;
      }
    }
  };

  useEffect(() => {
    if (countries) {
      const options = countries.map((country, index) => (
        <option key={index} value={country}>
          {country}
        </option>
      ));
      setCountriesOptions(options);
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmitSignup}
      className="w-[90%] flex flex-col justify-center items-center"
    >
      <p className="text-tertiary text-xl mb-4">Inscription</p>
      <div className="grid grid-cols-2 w-full gap-4">
        <label className={inputClassName}>
          <FaUser />*
          <InputLog
            type="text"
            placeholder="Nom"
            value={state.firstname}
            onChange={(e: any) =>
              dispatch({ type: 'SET_FIRSTNAME', payload: e.target.value })
            }
            required
          />
        </label>
        <label className={inputClassName}>
          <FaUser />*
          <InputLog
            type="text"
            placeholder="Prénom"
            value={state.lastname}
            onChange={(e: any) =>
              dispatch({ type: 'SET_LASTNAME', payload: e.target.value })
            }
            required
          />
        </label>
        <label className={inputClassName}>
          <FaUserSecret />*
          <InputLog
            type="text"
            placeholder="Pseudo"
            value={state.pseudo}
            onChange={(e: any) =>
              dispatch({ type: 'SET_PSEUDO', payload: e.target.value })
            }
            required
          />
        </label>
        <label className={inputClassName}>
          <IoMdMail />*
          <InputLog
            type="text"
            placeholder="Email"
            value={state.mail}
            onChange={(e: any) =>
              dispatch({ type: 'SET_EMAIL', payload: e.target.value })
            }
            required
          />
        </label>
        <label className={inputClassName}>
          <FaKey />*
          <InputLog
            type={showPassword ? 'text' : 'password'}
            placeholder="Mot de passe"
            value={state.password}
            onChange={(e: any) =>
              dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
            }
            required
          />
          <ButtonIcon onClick={togglePasswordVisibility}>
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </ButtonIcon>
        </label>
        <label className={inputClassName}>
          <FaKey />*
          <InputLog
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirmation mot de passe"
            value={state.confirmPassword}
            onChange={(e: any) =>
              dispatch({
                type: 'SET_CONFIRM_PASSWORD',
                payload: e.target.value,
              })
            }
            required
          />
          <ButtonIcon onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </ButtonIcon>
        </label>
        <label className={inputClassName}>
          <FaBirthdayCake />*
          <InputLog
            type="date"
            placeholder="DD/MM/YYYY"
            value={state.dateOfBirth}
            onChange={(e: any) =>
              dispatch({ type: 'SET_BIRTHDAY', payload: e.target.value })
            }
            required
          />
        </label>
        <label className={inputClassName}>
          <FaFlag />
          <select
            name="country"
            id="country"
            className="w-full bg-background"
            value={state.country}
            onChange={(e: any) =>
              dispatch({ type: 'SET_COUNTRY', payload: e.target.value })
            }
          >
            <option>Sélectionnez un pays</option>
            {countriesOptions}
          </select>
        </label>
      </div>
      <div className="form-control flex items-start">
        <label className="cursor-pointer label flex items-center">
          <input
            type="checkbox"
            className="checkbox checkbox-xs"
            checked={state.isTermsAccepted}
            onChange={(e: any) =>
              dispatch({
                type: 'SET_TERMS_ACCEPTED',
                payload: e.target.checked,
              })
            }
          />
          <span
            onClick={() => setCurrentStep(FormStep.CONDITION_OF_USE)}
            className="label-text ml-2"
          >
            Accepter les
            <a href="/conditionOfUse" className="text-blue-400">
              {' '}
              conditions d'utilisation
            </a>
          </span>
        </label>
      </div>
      {state.errorMessage && (
        <p className="text-xs text-center w-full mt-1 text-red-500">
          {state.errorMessage}
        </p>
      )}
      <p className="text-xs text-center w-full mt-2 mb-4 text-red-500">
        * Champ requis
      </p>
      <Button>S'inscrire</Button>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </form>
  );
};

export default FormSignup;
