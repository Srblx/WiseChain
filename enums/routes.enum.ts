enum RoutesEnum {
  // URL
  WEB_URL = 'http://localhost:3000/',

  // PAGES
  HOME = '/',
  ACTUALITY = '/articles',
  COURS_BLOCKCHAIN = '/courses/blockchain',
  COURS_CRYPTO = '/courses/crypto',
  COURS_INVESTMENT = '/courses/investment',
  COURS_NFTS = '/courses/nft',
  PROFILE = '/profile',
  ALL_COURSES_INVESTMENT = '/courses/Investment',
  ALL_COURSES_BLOCKCHAIN = '/courses/Blockchain',
  ALL_COURSES_CRYPTO = '/courses/Crypto-Monnaie',
  ALL_COURSES_NFTS = '/courses/NFT',
  ALL_ARTICLES = '/articles/all-articles',

  // API
  SIGNUP = '/api/signup',
  SIGNIN = '/api/signin',
  GENERATE_TOKEN = '/api/generate-token',
  VERIFY_MAIL = '/api/send-verify-email/verify-email',
  RESET_PASSWORD = '/api/claim-reset-password/reset-password',
  UPDATE_PASSWORD = '/api/user-profile/update-password',
  UPDATE_PROFIL_USER = '/api/user-profile/update-user-data',
  DELETE_ACCOUNT = '/api/user-profile/delete-profile-user',
  GET_LAST_SIX_ARTICLES = '/api/articles/last-six-articles',
  GET_LAST_SIX_COURSES = '/api/courses/last-six-coures',
  GET_ALL_ARTICLES = '/api/articles/all-articles',
}

// FUNCTIONS PAGES WITH URL DYNAMIQUE
const Routes = {
  ...RoutesEnum,
  ALL_COURSES: (label: string): string => `/courses/${label}`,
};

export default Routes;
