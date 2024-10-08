enum RoutesEnum {
  //? URL
  WEB_URL = 'http://localhost:3000/',

  //? PAGES NAVIGATION
  HOME = '/',
  ACTUALITY = '/articles',
  PROFILE = '/profile',
  GLOSSARY = '/glossary',
  MARKET = '/market',
  BACKOFFICE = '/profile/backoffice',
  API_C_MARCKET_CAP= '/api/market',

  /* Users */
  ADD_PFP= '/api/user-profile/update-user-data/add-pfp',
  /* Users */

  /* Course */
  COURSE = '/courses',
  ALL_COURSES_INVESTMENT = '/courses/Investment',
  ALL_COURSES_BLOCKCHAIN = '/courses/Blockchain',
  ALL_COURSES_CRYPTO = '/courses/Crypto-Monnaie',
  ALL_COURSES_NFTS = '/courses/NFT',
  ALL_ARTICLES = '/articles/all-articles',
  COURS_BLOCKCHAIN = '/courses/blockchain',
  COURS_CRYPTO = '/courses/crypto',
  COURS_INVESTMENT = '/courses/investment',
  COURS_NFTS = '/courses/nft',
  /* Course */

  /* Questionary */
  QUESTIONNARY = '/questionnary',
  CHECK_PREVIOUS_RESULT = '/questionnary',
  /* Questionary */

  //? API
  /*Auth */
  SIGNUP = '/api/signup',
  SIGNIN = '/api/signin',
  GENERATE_TOKEN = '/api/generate-token',
  VERIFY_MAIL = '/api/send-verify-email/verify-email',
  RESET_PASSWORD = '/api/claim-reset-password/reset-password',
  /*Auth */

  /*Setting user*/
  UPDATE_PASSWORD = '/api/user-profile/update-password',
  UPDATE_PROFIL_USER = '/api/user-profile/update-user-data',
  DELETE_ACCOUNT = '/api/user-profile/delete-profile-user',
  /*setting user*/

  /*Articles */
  GET_ALL_ARTICLES = '/api/articles/all-articles',
  GET_LAST_SIX_ARTICLES = '/api/articles/last-six-articles',
  GET_ONE_ARTICLE = '/api/articles/detail-article',
  /*Articles */

  /*Courses */
  GET_ALL_COURSES = '/api/courses/all-courses',
  GET_LAST_SIX_COURSES = '/api/courses/last-six-coures',
  GET_ONE_COURSE = '/api/courses/detail-course',
  GET_RELATED_COURSES = '/api/courses/related-course',
  /*Courses */

  /* Glossary */
  GET_GLOSSARY = '/api/glossary',
  /* Glossary */

  /* Questionnary */
  QUESTIONNARY_API = '/api/questionnary',
  /* Questionnary */

  /* Backoffice */
  CRUD_USERS = '/api/backoffice/users',
  CRUD_COURSE = '/api/backoffice/courses',
  CRUD_GLOSSARY = '/api/backoffice/glossary',
  CRUD_QUESTIONARY = '/api/backoffice/questionnary',
  CRUD_SEQUENCE_COURSE = '/api/backoffice/courses/sequence',
  GET_CATEGORY = '/api/backoffice/categories',
  /* Backoffice */
}

// FUNCTIONS PAGES WITH URL DYNAMIQUE
const Routes = {
  ...RoutesEnum,
  ALL_COURSES: (label: string): string => `/courses/${label}`,
};

export default Routes;
