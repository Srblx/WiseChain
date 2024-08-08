// Error messages related to authentication
export const ERROR_MESSAGES = {
  // Authentication Errors
  EMAIL_PASSWORD_REQUIRED: "L'email et le mot de passe sont requis",
  INVALID_EMAIL_PASSWORD: 'Email ou mot de passe invalide',
  USER_NOT_FOUND: 'Utilisateur non trouvé',
  AUTH_HEADER_REQUIRED: "L'en-tête d'autorisation est requis",
  TOKEN_REQUIRED: 'Le token est requis',
  INVALID_TOKEN: 'Token invalide',
  ERROR_PASSWORD_OR_MAIL: 'Invalid email or password',
  JWT_ERROR: 'JWT verification error:',

  // User-related Errors
  PSEUDO_ALREADY_TAKEN: 'Le pseudo est déjà utilisé.',
  EMAIL_ALREADY_TAKEN: "L'email est déjà utilisé.",
  PSEUDO_OR_MAIL_ALREADY_TAKEN: "L'email ou le pseudo est déjà utilisé.",
  USER_CREATION_ERROR: "Erreur lors de la création de l'utilisateur.",
  EMAIL_VERIFY: "Erreur lors de la vérification de l'email",
  OLD_PASSSWORD_INCORRECT: 'Ancien mot de passe incorrect',
  NEW_PASSWORD_CONFIRM_PASSWORD_NOT_MATCH:
    'Le nouveau mot de passe et la confirmation du mot de passe ne correspondent pas',
  UPDATE_PASSWORD: 'Erreur lors de la modification du mot de passe',
  UPDATE_PROFILE: 'Erreur lors de la modification du profil utilisateur :',
  MAIL_NOT_FOUND: "Cette adresse e-mail n'est pas enregistrée.",
  MAIL_NOT_SEND_RESET_PASSWORD: "Erreur lors de l'envoi de l'email",
  SIGNUP_FAILED: 'Erreur lors de la soumission du formulaire.',
  VALIDATE_DATA_ERROR: 'Erreur de validation des données.',
  MAIL_VERIFY:
    "Erreur lors de la vérification de l'email veuillez contacter le support",
  ERROR_DELETE_ACCOUNT: 'Erreur lors de la suppression du compte',
  FAILED_DELETE_ACCOUNT: 'Échec de la suppression du compte',

  // Server and connection errors
  INTERNAL_SERVER_ERROR: 'Erreur interne du serveur',
  ERROR_UNKNOWN: 'Une erreur est survenue. Veuillez réessayer plus tard.',
  ERROR_CONNECTION:
    'Une erreur est survenue. Veuillez vérifier votre connexion internet.',

  // Fetching data errors
  ERROR_FETCH_ARTICLES: 'Erreur lors de la récupération des articles',
  ERROR_FETCH_RELATED_COURSES: 'Error fetching related courses',
  ERROR_FETCHING_COURSE: 'Error fetching course',
  ERROR_FETCHING_GLOSSARY: 'Error fetching glossary',
  ERROR_FETCHING_ARTICLE: 'Error fetching article',
  ERROR_FETCHING_QUESTIONNARY: 'Erreur fetching questions:',
  ERROR_FETCHING_USER: 'Erreur fetching users:',

  // Not found errors
  NOT_PARAMS_FOUND: 'Param not found',
  NOT_COURSE_FOUND: 'Course not found',
  NO_GLOSSARY_FOUND: 'No glossary found',
  NOT_CATEGORY_FOUND: 'Category not found',
  ARTICLE_NOT_FOUND: 'Article not found',
  QUESTIONARY_NOT_FOUND: 'Questionary not found',

  // Missing fields
  MISSING_COURSE_ID: 'Missing course id',
  MISSING_FIELDS: 'Missing or invalid fields',
  MISSING_TOKEN: 'Token manquant',
  ALL_FIELDS_REQUIRED: 'Tous les champs sont requis',
  MISSING_USER_ID: "L'ID de l'utilisateur est manquant",
  DELETE_USER_ERROR: "Erreur lors de la suppression de l'utilisateur",
  ERROR_FORM_IS_INVALID: 'Erreur lors de la validation du formulaire',

  // Add errors
  ADD_USER_ERROR: "Erreur lors de la création de l'utilisateur",
  USER_ALREADY_EXISTS: "L'utilisateur existe déjà",

  // Update errors
  GENERAL_ERROR: 'Erreur générale',
  UPDATE_USER_ERROR: "Erreur lors de la mise à jour de l'utilisateur",

  // Other errors
  GENERATE_TOKEN: 'Error generating reset token:',
  RESET_PASSWORD: 'Erreur lors de la réinitialisation du mot de passe :',
  ERROR_SENDING_MAIL: "Erreur lors de l'envoi de l'email de vérification :",
  METHOD_NOT_ALLOWED: 'Méthode non autorisée',
  INTERNAL_ERROR: 'Erreur interne',
  ID_COURSE_REQUIRED: 'Id course required',
  NOT_SAVING: 'Error saving results:',
};

export const SUCCESS_MESSAGES = {
  // Success messages related to user actions
  EMAIL_VERIFY: 'Email vérifié avec succès',
  RESET_PASSWORD: 'Mot de passe réinitialisé avec succès',
  UPDATE_PASSWORD: 'Mot de passe mis à jour avec succès',
  UPDATE_PROFILE: 'Profil utilisateur modifié avec succès',
  MAIL_SEND_RESET_PASSWORD:
    'Un email de réinitialisation de mot de passe a été envoyé',
  MAIL_VERIFY: 'Votre adresse e-mail a été vérifiée avec succès',
  DELETE_ACCOUNT: 'Compte supprimé avec succès',
  MAIL_SEND: 'Email de vérification envoyé',
  RESULT_SAVED: 'Results saved successfully',
  USER_SUCCESSFULLY_DELETE: 'Utilisateur supprimé avec succès',
  ADD_USER: 'Utilisateur ajouté avec succès',
  USER_UPDATED: 'Utilisateur mis à jour avec succès',
};

export const ERROR_MESSAGES_YUP = {
  // Validation errors related to forms
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

// Category constants
export const CATEGORY = {
  INVESTMENT: 'Investissement',
  CRYPTO: 'Crypto-monnaie',
  BLOCKCHAIN: 'Blockchain',
  NFT: 'NFT',
};

// Date format constants
export const FORMATAGE_DATE = {
  FORMAT_FRENCH_DATE: 'DD/MM/YY - HH:mm',
  FORMAT_TO_DB: 'YYYY-MM-DD HH:mm:ss',
};
