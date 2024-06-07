# [Dependancies]

<!--? Front dependancies -> -->

### npx create-next-app@latest wisechain --typescript --eslint

### npm i -D autoprefixer

### npm i @tailwindcss/typography daisyui -D

### npm install --save-dev prettier

### npm i -D daisyui@latest

### npx shadcn-ui@latest init

### npm i react-icons --save

npm i yup
npm i react-icons --save

npm install jsonwebtoken dotenv
npm install --save-dev @types/jsonwebtoken

npm install react-daisyui

<!--* Back dependancies ->  -->

npm i next-auth
npm i prisma --save-dev
npm i @prisma/client
npm i @next-auth/prisma-adapter  
npm migrate dev
npx prisma migrate dev --name sync-schema 
npx prisma generate
npm studio  
npm install --save-dev cypress
npm run cypress:open
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom ts-jest

<!--^  Config -->

npm install --save-dev eslint-config-airbnb-typescript  
npm install --save-dev eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
npm install prettier --save-dev  
npm uninstall eslint-plugin-prettier prettier
npm install eslint-plugin-prettier prettier --save-dev

<!--! Arborencense  -->

nextjs-project/
├── app/
│ ├── (admin)/
│ │ ├── users/
│ │ │ ├── page.tsx
│ │ │ └── [...slug]/page.tsx
│ │ └── ...
│ ├── (auth)/
│ │ ├── login/
│ │ │ └── page.tsx
│ │ └── ...
│ └── ...
├── components/
│ ├── auth/
│ │ ├── LoginForm.tsx
│ │ └── ...
│ ├── ui/
│ │ ├── Button.tsx
│ │ └── ...
│ └── ...
├── hooks/
│ ├── useAuth.ts
│ └── ...
├── \_services/
│ ├── authService.ts
│ └── ...
├── \_lib/
│ ├── utils.ts
│ └── ...
├── styles/
│ ├── globals.css
│ └── ...
├── utils/
│ ├── helpers.ts
│ └── ...
└── ...
