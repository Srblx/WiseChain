import { notifyError, notifySucces } from '@/_utils/sonnerToast.utils';
import { LoginValidator, SignupValidator } from '@/interfaces/auth/auth.interface';


export const notifyLogin = (data: LoginValidator) => {
  if (data.email.trim() !== '' && data.password.trim() !== '') {
    notifySucces('Connexion réussie');
  } else {
    notifyError('Veuillez remplir tous les champs');
  }
};

export const notifySignup = (data: SignupValidator) => {
  const nameRegex = /^.{3,50}$/;
  const firstNameRegex = /^.{3,80}$/;
  const pseudoRegex = /^.{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

  if (!nameRegex.test(data.firstname)) {
    notifyError('Le nom doit avoir entre 3 et 50 caractères');
    return;
  }

  if (!firstNameRegex.test(data.lastname)) {
    notifyError('Le prénom doit avoir entre 3 et 80 caractères');
    return;
  }

  if (!pseudoRegex.test(data.pseudo)) {
    notifyError('Le pseudo doit avoir au moins 3 caractères');
    return;
  }

  if (!emailRegex.test(data.email)) {
    notifyError("L'email n'est pas valide");
    return;
  }

  if (!passwordRegex.test(data.password)) {
    notifyError(
      'Le mot de passe doit avoir au moins 12 caractères et contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
    );
    return;
  }

  if (data.password !== data.confirmPassword) {
    notifyError('Les mots de passe ne correspondent pas');
    return;
  }

  if (!data.dateOfBirth) {
    notifyError("Veuillez entrer votre date de naissance");
    return;
  }

  const currentDate = new Date();
const birthDate = new Date(data.dateOfBirth);
const age = currentDate.getFullYear() - birthDate.getFullYear();

if (age > 100) {
  notifyError('Vous ne pouvez pas avoir plus de 100 ans');
  return;
} else if (age < 10) {
  notifyError('Vous devez avoir au moins 10 ans ou contacter le support via contact.');
  return;
}

//   if (!data.country) {
//     notifyError("Veuillez sélectionner un pays");
//     return;
//   }

if (!data.isTermsAccepted) {
  notifyError("Vous devez accepter les conditions d'utilisation");
  return;
}
  notifySucces('Inscription réussie');
};

export const notifyForgotPassword = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    notifyError("Le format de l'email n'est pas valide");
    return;
  }

  notifySucces('Un email vous a été envoyé');
}