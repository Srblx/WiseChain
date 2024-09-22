export const ERROR_MESSAGES_FR = {
  // Authentication Errors
  EMAIL_PASSWORD_REQUIRED: "L'email et le mot de passe sont requis",
  INVALID_EMAIL_PASSWORD: 'Email ou mot de passe invalide',
  USER_NOT_FOUND: 'Utilisateur non trouvé',
  AUTH_HEADER_REQUIRED: "L'en-tête d'autorisation est requis",
  TOKEN_REQUIRED: 'Le token est requis',
  INVALID_TOKEN: 'Token invalide',
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
  DELETE_COURSE_ERROR: 'Erreur lors de la suppression du cours',

  // Server and connection errors
  INTERNAL_SERVER_ERROR: 'Erreur interne du serveur',
  ERROR_UNKNOWN: 'Une erreur est survenue. Veuillez réessayer plus tard.',
  ERROR_CONNECTION:
    'Une erreur est survenue. Veuillez vérifier votre connexion internet.',

  // Fetching data errors
  ERROR_FETCH_ARTICLES: 'Erreur lors de la récupération des articles',
  ERROR_FETCHING_COURSE: 'Erreur lors de la récupération du cours',
  ERROR_FETCHING_GLOSSARY: 'Erreur lors de la récupération du glossaire',
  ERROR_FETCHING_ARTICLE: "Erreur lors de la récupération de l'article",
  ERROR_FETCHING_QUESTIONNARY:
    'Erreur lors de la récupération du questionnaire :',
  ERROR_FETCHING_USER: 'Erreur lors de la récupération des utilisateurs :',
  ERROR_FETCHING_CATEGORY: 'Erreur lors de la récupération de la catégorie',
  ERROR_FETCHING_QUESTIONARY: 'Erreur lors de la récupération du questionnaire',
  ERROR_FETCHING_SEQUENCE: 'Erreur lors de la récupération de la séquence',
  ERROR_CHECKING_PREVIOUS_RESULT:
    'Erreur lors de la vérification des résultats précédents',
  ERROR_FETCHING_DATA: 'Erreur lors de la récupération des données',

  // Not found errors
  NOT_COURSE_FOUND: 'Cours non trouvé',
  NO_GLOSSARY_FOUND: 'Glossaire non trouvé',
  NOT_CATEGORY_FOUND: 'Catégorie non trouvée',
  ARTICLE_NOT_FOUND: 'Article non trouvé',
  QUESTIONARY_NOT_FOUND: 'Questionnaire non trouvé',
  COURSE_NOT_FOUND: 'Cours non trouvé',

  // Missing fields
  MISSING_COURSE_ID: 'ID du cours manquant',
  MISSING_FIELDS: 'Champs manquants ou invalides',
  MISSING_TOKEN: 'Token manquant',
  ALL_FIELDS_REQUIRED: 'Tous les champs sont requis',
  MISSING_USER_ID: "L'ID de l'utilisateur est manquant",
  DELETE_USER_ERROR: "Erreur lors de la suppression de l'utilisateur",
  ERROR_FORM_IS_INVALID: 'Erreur lors de la validation du formulaire',

  // Add errors
  ADD_USER_ERROR: "Erreur lors de la création de l'utilisateur",
  USER_ALREADY_EXISTS: "L'utilisateur existe déjà",
  ADD_COURSE_ERROR: "Erreur lors de l'ajout du cours",
  ADD_GLOSSARY_ERROR: "Erreur lors de l'ajout du glossaire",
  ADD_QUESTIONARY_ERROR: "Erreur lors de l'ajout du questionnaire",
  ADD_SEQUENCE_ERROR: "Erreur lors de l'ajout de la séquence",
  ERROR_ADDING_GLOSSARY: "Erreur lors de l'ajout du glossaire",
  PSEUDO_OR_MAIL_ALREADY_TAKEN: 'Pseudo ou email déjà pris',

  // Update errors
  GENERAL_ERROR: 'Erreur générale',
  UPDATE_USER_ERROR: "Erreur lors de la mise à jour de l'utilisateur",
  ERROR_UPDATE_COURSE: 'Erreur lors de la mise à jour du cours',
  ERROR_UPDATE_GLOSSARY: 'Erreur lors de la mise à jour du glossaire',
  ERROR_UPDATING_GLOSSARY: 'Erreur lors de la mise à jour du glossaire',

  // Delete errors
  ERROR_DELETING_COURSE: 'Erreur lors de la suppression du cours',
  DELETE_GLOSSARY_ERROR: 'Erreur lors de la suppression du glossaire',
  DELETE_QUESTIONARY_ERROR: 'Erreur lors de la suppression du questionnaire',
  DELETE_SEQUENCE_ERROR: 'Erreur lors de la suppression de la séquence',
  ERROR_DELETING_GLOSSARY: 'Erreur lors de la suppression du glossaire',
  FAILD_DELETE_COMPTE: 'Échec de la suppression du compte',
  ERROR_DELETE_COMPTE: 'Erreur lors de la suppression du compte',

  // Other errors
  GENERATE_TOKEN: 'Erreur lors de la génération du token de réinitialisation :',
  RESET_PASSWORD: 'Erreur lors de la réinitialisation du mot de passe :',
  ERROR_SENDING_MAIL: "Erreur lors de l'envoi de l'email de vérification :",
  METHOD_NOT_ALLOWED: 'Méthode non autorisée',
  INTERNAL_ERROR: 'Erreur interne',
  ID_COURSE_REQUIRED: 'ID du cours requis',
  NOT_SAVING: 'Erreur lors de la sauvegarde des résultats :',
  ERROR_UPDATE_PICTURES: 'Erreur lors de la mise à jour des images :',
  ERROR_SAVED_RESULTS: 'Erreur lors de la sauvegarde des résultats :',
};

export const ERROR_MESSAGES_EN = {
  // Authentication Errors
  ERROR_PASSWORD_OR_MAIL: 'Invalid email or password',
  JWT_ERROR: 'JWT verification error:',
  EMAIL_VERIFY: 'Error verifying email',
  INVALID_TOKEN: 'Invalid',
  AUTH_HEADER_REQUIRED: 'Authorization header is required',
  TOKEN_REQUIRED: 'Token is required',
  INVALID_EMAIL_PASSWORD: 'Invalid email or password',
  EMAIL_PASSWORD_REQUIRED: 'Email and password are required',

  // User-related Errors
  PSEUDO_ALREADY_TAKEN: 'Pseudo is already taken.',
  EMAIL_ALREADY_TAKEN: 'Email is already taken.',
  PSEUDO_OR_MAIL_ALREADY_TAKEN: 'Email or pseudo is already taken.',
  USER_CREATION_ERROR: 'Error creating user.',

  // Server and connection errors
  INTERNAL_SERVER_ERROR: 'Internal server error',
  ERROR_UNKNOWN: 'An error occurred. Please try again later.',
  ERROR_CONNECTION: 'An error occurred. Please check your internet connection.',

  // Fetching data errors
  USERS_NOT_FOUND: 'Not found Users',
  ERROR_FETCH_RELATED_COURSES: 'Error fetching related courses',
  ERROR_FETCHING_COURSE: 'Error fetching course',
  ERROR_FETCHING_GLOSSARY: 'Error fetching glossary',
  ERROR_FETCHING_ARTICLE: 'Error fetching article',
  ERROR_FETCHING_QUESTIONNARY: 'Error fetching questions:',
  ERROR_FETCHING_USER: 'Error fetching users:',
  ERROR_FETCHING_CATEGORY: 'Error fetching category',
  ERROR_FETCHING_QUESTIONARY: 'Error fetching questionary',
  ERROR_FETCHING_SEQUENCE: 'Error fetching sequence',

  // Not found errors
  NOT_PARAMS_FOUND: 'Param not found',
  NOT_COURSE_FOUND: 'Course not found',
  NO_GLOSSARY_FOUND: 'No glossary found',
  NOT_CATEGORY_FOUND: 'Category not found',
  ARTICLE_NOT_FOUND: 'Article not found',
  QUESTIONARY_NOT_FOUND: 'Questionary not found',
  COURSE_NOT_FOUND: 'Course not found',

  // Missing fields
  MISSING_COURSE_ID: 'Missing course id',
  MISSING_FIELDS: 'Missing or invalid fields',
  MISSING_TOKEN: 'Token is missing',
  ALL_FIELDS_REQUIRED: 'All fields are required',
  MISSING_USER_ID: 'User ID is missing',
  DELETE_USER_ERROR: 'Error deleting user',
  ERROR_FORM_IS_INVALID: 'Error validating form',
  MISSING_USER_ID_OR_QUESTIONARY_ID: 'Missing userId or questionaryId',
  MISSING_QUESTIONARY_ID: 'Missing questionaryId',
  MISSING_FIELDS_IN_REQUEST: 'Missing fields in request',

  // Add errors
  ADD_USER_ERROR: 'Error adding user',
  USER_ALREADY_EXISTS: 'User already exists',
  ADD_COURSE_ERROR: 'Error adding course',
  ADD_GLOSSARY_ERROR: 'Error adding glossary',
  ADD_QUESTIONARY_ERROR: 'Error adding questionary',
  ADD_SEQUENCE_ERROR: 'Error adding sequence',
  ERROR_ADDING_GLOSSARY: 'Error adding glossary',

  // Update errors
  GENERAL_ERROR: 'General error',
  UPDATE_USER_ERROR: 'Error updating user',
  ERROR_UPDATE_COURSE: 'Error updating course',
  ERROR_UPDATE_GLOSSARY: 'Error updating glossary',
  ERROR_UPDATING_GLOSSARY: 'Error updating glossary',

  // Delete errors
  ERROR_DELETING_COURSE: 'Error deleting course',
  ERROR_DELETE_COURSE: 'Error deleting course',
  DELETE_GLOSSARY_ERROR: 'Error deleting glossary',
  DELETE_QUESTIONARY_ERROR: 'Error deleting questionary',
  DELETE_SEQUENCE_ERROR: 'Error deleting sequence',
  ERROR_DELETING_GLOSSARY: 'Error deleting glossary',

  // Other errors
  GENERATE_TOKEN: 'Error generating reset token:',
  RESET_PASSWORD: 'Error resetting password:',
  ERROR_SENDING_MAIL: 'Error sending verification email:',
  METHOD_NOT_ALLOWED: 'Method not allowed',
  INTERNAL_ERROR: 'Internal error',
  ID_COURSE_REQUIRED: 'Course ID required',
  NOT_SAVING: 'Error saving results:',
  ERROR_GENERATING_PRESIGNED_URL: 'Error generating presigned URL:',
  FAILED_GENERATE_PRESIGNED_URL: 'Failed to generate presigned URL',
  ERROR_UPLOAD_HANDLER: 'Error in upload handler:',
  MUST_BE_USED_FOOTER_PROVIDER:
    'useFooter must be used within a FooterProvider',
  MUST_BE_USED_USER_PROVIDER: 'useUser must be used within a UserProvider',

  // Invalid errors
  INVALID_KEY: 'Invalid key parameter',
  INVALID_COURSE_ID: 'Invalid course ID',
  INVALID_USER_ID: 'Invalid userId',
  INVALID_REQUEST: 'Invalid request',
  INVALID_FILE_FORMAT: 'Invalid file format',

  // Required
  FILENAME_MIMETYPE_FILE_REQUIRED: 'Filename, mimetype, and file are required',
};

export const SUCCESS_MESSAGES_FR = {
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
  RESULT_SAVED: 'Résultats enregistrés avec succès',
  USER_SUCCESSFULLY_DELETE: 'Utilisateur supprimé avec succès',
  ADD_USER: 'Utilisateur ajouté avec succès',
  USER_UPDATED: 'Utilisateur mis à jour avec succès',
  COURSE_UPDATED: 'Cours mis à jour avec succès',
  COURSE_DELETED_SUCCESSFULLY: 'Cours supprimé avec succès',
  GLOSSARY_UPDATED: 'Définition mise à jour avec succès',
  QUESTIONARY_UPDATED: 'Questionnaire mis à jour avec succès',
  SEQUENCE_UPDATED: 'Séquence mise à jour avec succès',
  COURSE_ADDED: 'Cours ajouté avec succès',
};

export const SUCCESS_MESSAGES_EN = {
  // Success messages related to user actions
  EMAIL_VERIFY: 'Email verified successfully',
  RESET_PASSWORD: 'Password reset successfully',
  UPDATE_PASSWORD: 'Password updated successfully',
  UPDATE_PROFILE: 'User profile updated successfully',
  MAIL_SEND_RESET_PASSWORD: 'A password reset email has been sent',
  MAIL_VERIFY: 'Your email address has been verified successfully',
  DELETE_ACCOUNT: 'Account deleted successfully',
  MAIL_SEND: 'Verification email sent',
  RESULT_SAVED: 'Results saved successfully',
  USER_SUCCESSFULLY_DELETE: 'User deleted successfully',
  ADD_USER: 'User added successfully',
  USER_UPDATED: 'User updated successfully',
  COURSE_UPDATED: 'Course updated successfully',
  COURSE_DELETED_SUCCESSFULLY: 'Course deleted successfully',
  GLOSSARY_UPDATED: 'Glossary updated successfully',
  QUESTIONARY_UPDATED: 'Questionary updated successfully',
  SEQUENCE_UPDATED: 'Sequence updated successfully',
  COURSE_ADDED: 'Course added successfully',
};

export const ERROR_MESSAGES_YUP_FR = {
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

export const ERROR_MESSAGES_YUP_EN = {
  // Validation errors related to forms
  MAIL_REQUIRED: 'Email is required',
  MAIL_NOT_VALID: 'Email is not valid',
  PASSWORD_REQUIRED: 'Password is required',
  FIRSNAME_REQUIRED: 'First name is required',
  FIRSTNAME_MUST_HAVE: 'First name must be between 3 and 50 characters',
  LASTNAME_REQUIRED: 'Last name is required',
  LASTNAME_MUST_HAVE: 'Last name must be between 3 and 80 characters',
  PSEUDO_REQUIRED: 'Pseudo is required',
  PSEUDO_MUST_HAVE: 'Pseudo must be at least 3 characters',
  PASSWORD_MUST_HAVE_LENGHT_MIN: 'Password must be at least 12 characters',
  PASSWORD_MUST_HAVE:
    'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  PASSWORD_CONFIRMATION_REQUIRED: 'Password confirmation is required',
  PASSWORD_NOT_MATCH: 'Passwords do not match',
  DATEOFBIRTH_REQUIRED: 'You must enter a valid date of birth',
  DATEOFBIRTH_AGE:
    'You must be at least 10 years old or less than 100 years old, otherwise contact support via contact.',
  COUNTRY_REQUIRED: 'Country is required',
  IS_TERMS_ACCEPTED: 'You must accept the terms of use',
  FORMAT_MAIL_INVALID: 'Email format is not valid',
  SEND_MAIL: 'An email has been sent to you',
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
