// Utils
import countries from '@/_utils/data/country';
import {
  SignupAction,
  initialState,
  signupReducer,
} from '@/_utils/data/signupReducer';
import usePasswordVisibility, {
  useConfirmPasswordVisibility,
} from '@/_utils/usePasswordVisibility.utils';

// Components
import Button from '@/components/shared/auth/BtnSubmit.component';
import Input from '@/components/shared/auth/Input.component';

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
import * as Yup from 'yup';

// Interfaces
import FormStep from '@/enums/formStep.emun';
import { SignupValidator } from '@/interfaces/auth/auth.interface';
import { FormSignupProps } from '@/interfaces/modal.interface';

// Hooks

// Axios
import useAuth from '@/hooks/useAuth.hooks';
import axios from 'axios';

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
      await SignupSchema.validate(signupData, { abortEarly: true });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        toast.error(error.message);
        return;
      }
    }

    try {
      const response = await axios.post('/api/signup', signupData);

      if (response.status === 201) {
        const { token } = response.data;
        login(token);

        toast.success('Inscription réussie');
        onSuccess();
      } else {
        throw new Error('Erreur lors de la soumission du formulaire.');
      }
    } catch (error) {
      console.error(error);
      let errorMessage = "Erreur lors de la création de l'utilisateur.";
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          errorMessage =
            error.response.data.error || 'Erreur de validation des données.';
        } else if (error.response.status === 409) {
          errorMessage = "Le pseudo ou l'email est déjà utilisé.";
        }
      }
      dispatch({ type: 'SET_ERROR_MESSAGE', payload: errorMessage });
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
          <Input
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
          <Input
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
          <Input
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
          <Input
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
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Mot de passe"
            value={state.password}
            onChange={(e: any) =>
              dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
            }
            required
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </label>
        <label className={inputClassName}>
          <FaKey />*
          <Input
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
          <button type="button" onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </label>
        <label className={inputClassName}>
          <FaBirthdayCake />*
          <Input
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
