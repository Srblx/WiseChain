# [Dependancies] 

<!--? Front dependancies -> -->
### npx create-next-app@latest wisechain --typescript --eslint    
### npm i -D autoprefixer   
### npm i @tailwindcss/typography daisyui -D  
### npm install --save-dev prettier
### npm i -D daisyui@latest
### npx shadcn-ui@latest init
npm install react-icons --save

<!--* Back dependancies ->  -->




<!--! Arborencense  -->
nextjs-project/
├── app/
│   ├── (admin)/
│   │   ├── users/
│   │   │   ├── page.tsx
│   │   │   └── [...slug]/page.tsx
│   │   └── ...
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── ...
│   └── ...
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── ...
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── ...
│   └── ...
├── hooks/
│   ├── useAuth.ts
│   └── ...
├── _services/
│   ├── authService.ts
│   └── ...
├── _lib/
│   ├── utils.ts
│   └── ...
├── styles/
│   ├── globals.css
│   └── ...
├── utils/
│   ├── helpers.ts
│   └── ...
└── ...
