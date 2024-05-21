import { notifyError, notifySucces } from '@/_utils/sonnerToast.utils';
import { LoginValidator, SignupValidator } from '@/interfaces/auth/auth.interface';
import * as Yup from 'yup';


export const notifyLogin = (data: LoginValidator) => {
  if (data.email.trim() !== '' && data.password.trim() !== '') {
    notifySucces('Connexion réussie');
  } else {
    notifyError('Veuillez remplir tous les champs');
  }
};


export const notifyForgotPassword = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    notifyError("Le format de l'email n'est pas valide");
    return;
  }

  notifySucces('Un email vous a été envoyé');
}

export const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Le nom doit avoir entre 3 et 50 caractères')
    .max(50, 'Le nom doit avoir entre 3 et 50 caractères')
    .required('Le nom est requis'),
  lastname: Yup.string()
    .min(3, 'Le prénom doit avoir entre 3 et 80 caractères')
    .max(80, 'Le prénom doit avoir entre 3 et 80 caractères')
    .required('Le prénom est requis'),
  pseudo: Yup.string()
    .min(3, 'Le pseudo doit avoir au moins 3 caractères')
    .required('Le pseudo est requis'),
  mail: Yup.string()
    .email("L'email n'est pas valide")
    .required("L'email est requis"),
  password: Yup.string()
    .min(12, 'Le mot de passe doit avoir au moins 12 caractères')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/, 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial')
    .required('Le mot de passe est requis'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
    .required('La confirmation du mot de passe est requise'),
  dateOfBirth: Yup.date()
    .required('La date de naissance est requise')
    .test('age', 'Vous devez avoir au moins 10 ans ou contacter le support via contact.', function (value) {
      const currentDate = new Date();
      const birthDate = new Date(value);
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      return age >= 10 && age <= 100;
    }),
  country: Yup.string().required('Le pays est requis'),
  isTermsAccepted: Yup.boolean()
    .oneOf([true], "Vous devez accepter les conditions d'utilisation")
    .required("Vous devez accepter les conditions d'utilisation"),
});

export const notifySignup = (data: SignupValidator): string | null => {
  const nameRegex = /^.{3,50}$/;
  const firstNameRegex = /^.{3,80}$/;
  const pseudoRegex = /^.{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

  if (!nameRegex.test(data.firstname)) {
    return 'Le nom doit avoir entre 3 et 50 caractères';
  }

  if (!firstNameRegex.test(data.lastname)) {
    return 'Le prénom doit avoir entre 3 et 80 caractères';
  }

  if (!pseudoRegex.test(data.pseudo)) {
    return 'Le pseudo doit avoir au moins 3 caractères';
  }

  if (!emailRegex.test(data.mail)) {
    return "L'email n'est pas valide";
  }

  if (!passwordRegex.test(data.password)) {
    return 'Le mot de passe doit avoir au moins 12 caractères et contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial';
  }

  if (data.password !== data.confirmPassword) {
    return 'Les mots de passe ne correspondent pas';
  }

  if (!data.dateOfBirth) {
    return "Veuillez entrer votre date de naissance";
  }

  const currentDate = new Date();
  const birthDate = new Date(data.dateOfBirth);
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  if (age > 100) {
    return 'Vous ne pouvez pas avoir plus de 100 ans';
  } else if (age < 10) {
    return 'Vous devez avoir au moins 10 ans ou contacter le support via contact.';
  }

  if (!data.isTermsAccepted) {
    return "Vous devez accepter les conditions d'utilisation";
  }

  return null;
};
