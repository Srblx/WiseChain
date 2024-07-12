// Error messages
export const ERROR_MESSAGES = {
  EMAIL_PASSWORD_REQUIRED: "L'email et le mot de passe sont requis",
  INVALID_EMAIL_PASSWORD: 'Email ou mot de passe invalide',
  USER_NOT_FOUND: 'Utilisateur non trouvé',
  AUTH_HEADER_REQUIRED: "L'en-tête d'autorisation est requis",
  TOKEN_REQUIRED: 'Le token est requis',
  INVALID_TOKEN: 'Token invalide',
  INTERNAL_SERVER_ERROR: 'Erreur interne du serveur',
  ALL_FIELDS_REQUIRED: 'Tous les champs sont requis.',
  PSEUDO_ALREADY_TAKEN: 'Le pseudo est déjà utilisé.',
  EMAIL_ALREADY_TAKEN: "L'email est déjà utilisé.",
  PSEUDO_OR_MAIL_ALREADY_TAKEN: "L'email ou le pseudo est déjà utilisé.",
  USER_CREATION_ERROR: "Erreur lors de la création de l'utilisateur.",
  EMAIL_VERIFY: "Erreur lors de la vérification de l'email",
  GENERATE_TOKEN: 'Error generating reset token:',
  RESET_PASSWORD: 'Erreur lors de la réinitialisation du mot de passe :',
  OLD_PASSSWORD_INCORRECT: 'Ancien mot de passe incorrect',
  NEW_PASSWORD_CONFIRM_PASSWORD_NOT_MATCH:
    'Le nouveau mot de passe et la confirmation du mot de passe ne correspondent pas',
  UPDATE_PASSWORD: 'Erreur lors de la modification du mot de passe',
  UPDATE_PROFILE: 'Erreur lors de la modification du profil utilisateur :',
  MAIL_NOT_FOUND: "Cette adresse e-mail n'est pas enregistrée.",
  MAIL_NOT_SEND_RESET_PASSWORD: "Erreur lors de l'envoi de l'email",
  ERROR_UNKNOWN: 'Une erreur est survenue. Veuillez réessayer plus tard.',
  ERROR_CONNECTION:
    'Une erreur est survenue. Veuillez vérifier votre connexion internet.',
  SIGNUP_FAILED: 'Erreur lors de la soumission du formulaire.',
  VALIDATE_DATA_ERROR: 'Erreur de validation des données.',
  MAIL_VERIFY:
    "Erreur lors de la vérification de l'email veuillez contacter le support",
  ERROR_DELETE_ACCOUNT: 'Erreur lors de la suppression du compte',
  FAILED_DELETE_ACCOUNT: 'Échec de la suppression du compte',
  ERROR_FETCH_ARTICLES: 'Erreur lors de la récupération des articles',
  ERROR_FETCH_RELATED_COURSES: 'Error fetching related courses',
  NOT_PARAMS_FOUND: 'Param not found',
  NOT_COURSE_FOUND: 'Course not found',
  ERROR_FETCHING_COURSE: 'Error fetching course',
  NOT_CATEGORY_FOUND: 'Category not found',
};

export const SUCCESS_MESSAGES = {
  EMAIL_VERIFY: 'Email vérifié avec succès',
  RESET_PASSWORD: 'Mot de passe réinitialisé avec succès',
  UPDATE_PASSWORD: 'Mot de passe mis à jour avec succès',
  UPDATE_PROFILE: 'Profil utilisateur modifié avec succès',
  MAIL_SEND_RESET_PASSWORD:
    'Un email de réinitialisation de mot de passe a été envoyé',
  MAIL_VERIFY: 'Votre adresse e-mail a été vérifiée avec succès',
  DELETE_ACCOUNT: 'Compte supprimé avec succès',
};

export const ERROR_MESSAGES_YUP = {
  MAIL_REQUIRED: "L'email est requis",
  MAIL_NOT_VALID: "L'email n'est pas valide",
  PASSWORD_REQUIRED: 'Le mot de passe est requis',

  FIRSNAME_REQUIRED: 'Le prénom est requis',
  FIRSTNAME_MUST_HAVE: 'Le nom doit contenir entre 3 et 50 caractères',

  LASTNAME_REQUIRED: 'Le nom est requis',
  LASTNAME_MUST_HAVE: 'Le prénom doit contenir entre 3 et 80 caractères',

  PSEUDO_REQUIRED: 'Le pseudo est requis',
  PSEUDO_MUST_HAVE: 'Le pseudo doit contenir au moins 3 caractères',

  PASSWORD_MUST_HAVE_LENGHT_MIN:
    'Le mot de passe doit avoir au moins 12 caractères',
  PASSWORD_MUST_HAVE:
    'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial',
  PASSWORD_CONFIRMATION_REQUIRED: 'La confirmation du mot de passe est requise',
  PASSWORD_NOT_MATCH: 'Les mots de passe ne correspondent pas',

  DATEOFBIRTH_REQUIRED: 'Vous devez saisir une date de naissance valide',
  DATEOFBIRTH_AGE:
    'Vous devez avoir au moins 10 ans ou moins de 100 ans, sinon contacter le support via contact.',

  COUNTRY_REQUIRED: 'Le pays est requis',

  IS_TERMS_ACCEPTED: "Vous devez accepter les conditions d'utilisation",

  FORMAT_MAIL_INVALID: "Le format de l'email n'est pas valide",

  SEND_MAIL: 'Un email vous a été envoyé',
};

export const CATEGORY = {
  INVESTMENT: 'Investissement',
  CRYPTO: 'Crypto-monnaie',
  BLOCKCHAIN: 'Blockchain',
  NFT: 'NFT',
};

export const FORMATAGE_DATE = {
  FORMAT_FRENCH_DATE: 'DD/MM/YY - HH:mm'
};