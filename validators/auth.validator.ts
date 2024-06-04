import { notifyError, notifySucces } from '@/_utils/sonnerToast.utils';
import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  mail: Yup.string()
    .email("L'email n'est pas valide")
    .required("L'email est requis"),
  password: Yup.string().required('Le mot de passe est requis'),
});

export const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Le nom doit contenir entre 3 et 50 caractères')
    .max(50, 'Le nom doit contenir entre 3 et 50 caractères')
    .required('Le nom est requis'),
  lastname: Yup.string()
    .min(3, 'Le prénom doit contenir entre 3 et 80 caractères')
    .max(80, 'Le prénom doit contenir entre 3 et 80 caractères')
    .required('Le prénom est requis'),
  pseudo: Yup.string()
    .min(3, 'Le pseudo doit contenir au moins 3 caractères')
    .required('Le pseudo est requis'),
  mail: Yup.string()
    .email("L'email n'est pas valide")
    .required("L'email est requis"),
  password: Yup.string()
    .min(12, 'Le mot de passe doit avoir au moins 12 caractères')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,
      'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
    )
    .required('Le mot de passe est requis'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
    .required('La confirmation du mot de passe est requise'),
    dateOfBirth: Yup.date()
    .transform((value, originalValue) => {
      if (originalValue === '') {
        return null; 
      }
      return value; 
    })
    .nullable() 
    .required('Vous devez saisir une date de naissance valide')
    .test(
      'age',
      'Vous devez avoir au moins 10 ans ou moins de 100 ans, sinon contacter le support via contact.',
      function (value) {
        const currentDate = new Date();
        const birthDate = new Date(value);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        return age >= 10 && age <= 100;
      }
    ),
  country: Yup.string().required('Le pays est requis'),
  isTermsAccepted: Yup.boolean()
    .oneOf([true], "Vous devez accepter les conditions d'utilisation")
    .required("Vous devez accepter les conditions d'utilisation"),
});


export const notifyForgotPassword = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    notifyError("Le format de l'email n'est pas valide");
    return;
  }

  notifySucces('Un email vous a été envoyé');
};

export const passwordResetSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(12, 'Le mot de passe doit avoir au moins 12 caractères')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,
      'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
    )
    .required('Le mot de passe est requis'),
  confirmNewPassword: Yup.string()
    .nullable()
    .oneOf([Yup.ref('newPassword')], 'Les mots de passe ne correspondent pas')
    .required('La confirmation du mot de passe est requise'),
});