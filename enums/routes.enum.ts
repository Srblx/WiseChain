enum Routes {
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

  // API
  SIGNUP = '/api/signup',
  SIGNIN = '/api/signin',
  GENERATE_TOKEN = '/api/generateToken',
  VERIFY_MAIL = '/api/sendVerifyEmail/verifyEmail',
  RESET_PASSWORD = '/api/claimResetPassword/resetPassword',
  UPDATE_PASSWORD = '/api/userProfile/updatePassword',
  UPDATE_PROFIL_USER = '/api/userProfile/updateUserData',
  DELETE_ACCOUNT = '/api/userProfile/deleteProfileUser',
  GET_LAST_FIVE_ARTICLES = '/api/articles',
  GET_LAST_SIX_COURSES = '/api/courses/coursesHome',
}

export default Routes;
