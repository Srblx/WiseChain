enum Routes {
  // URL
  WEB_URL = 'http://localhost:3000/',

  // PAGES
  HOME = '/',
  ACTUALITY = '/articles',
  COURS_BLOCKCHAIN = '/courses/investment',
  COURS_CRYPTO = '/courses/crypto',
  COURS_INVESTMENT = '/courses/blockchain',
  COURS_NFTS = '/courses/nft',
  PROFILE = '/profile',

  // API
  SIGNUP = '/api/signup',
  SIGNIN = '/api/signin',
  GENERATE_TOKEN = '/api/generateToken',
  VERIFY_MAIL = '/api/sendVerifyEmail/verifyEmail',
  RESET_PASSWORD = '/api/resetPassword',
}

export default Routes;
