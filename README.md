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
 npx prisma migrate dev --name sync-schema                                                                                                                 ─╯
npx prisma generate
 npm studio   

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


// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(uuid())
  firstname     String
  lastname      String
  pseudo        String   @unique
  mail          String   @unique
  password      String
  country       String   @default("france")
  date_of_birth DateTime @db.Date
  roles         String   @default("suscriber")
  profile_img   String?
  is_revoice    Boolean
  created_at    DateTime @default(now()) @db.Date
  articles      Article[]
  realize_questionaries RealizeQuestionary[]
  staff_requests StaffRequest[]
  community_messages CommunityMessage[]
  fictive_accounts FictiveAccount[]
  user_rewards   UserReward[]
}

model Article {
  id         String   @id @default(uuid())
  title      String
  content    String   @db.Text
  cover_img  String
  img        String?
  created_at DateTime @default(now()) @db.Date
  user       User     @relation(fields: [user_id], references: [id])
  user_id    String
  category   Category @relation(fields: [category_id], references: [id])
  category_id String
}

model RealizeQuestionary {
  id                    String   @id @default(uuid())
  score                 Int
  date_of_realize_questionary Boolean
  user                  User     @relation(fields: [user_id], references: [id])
  user_id               String
  questionary           Questionary @relation(fields: [questionary_id], references: [id])
  questionary_id        String
}

model Questionary {
  id         String   @id @default(uuid())
  subject    String   @db.VarChar(150)
  creator    String
  created_at DateTime @default(now()) @db.Date
  realize_questionaries RealizeQuestionary[]
  rewards    Reward[]
  questions  Question[]
  answers    Answer[]
}

model Course {
  id          String   @id @default(uuid())
  main_title  String
  description String?
  content     String   @db.Text
  created_at  DateTime @default(now()) @db.Date
  update_at   DateTime @updatedAt @db.Date
  category    Category @relation(fields: [category_id], references: [id])
  category_id String
  sequences   Sequence[]
  tool_courses ToolCourse[]
}

model ToolCourse {
  course   Course @relation(fields: [course_id], references: [id])
  course_id String
  tool     Tool   @relation(fields: [tool_id], references: [id])
  tool_id  String

  @@id([course_id, tool_id])
}

model Tool {
  id   String @id @default(uuid())
  name String @db.VarChar(150)
  link String @db.VarChar(200)
  img  String @db.Text
  tool_courses ToolCourse[]
}

model Sequence {
  id        String @id @default(uuid())
  index     Int    @unique
  title     String @db.Text
  containt  String @db.Text
  img       String? @db.Text
  course    Course @relation(fields: [course_id], references: [id])
  course_id String
}

model Reward {
  id            String   @id @default(uuid())
  is_claim      Boolean
  date_of_claim DateTime? @db.Date
  questionary   Questionary @relation(fields: [questionary_id], references: [id])
  questionary_id String
  user_rewards  UserReward[]
}

model UserReward {
  user     User   @relation(fields: [user_id], references: [id])
  user_id  String
  reward   Reward @relation(fields: [reward_id], references: [id])
  reward_id String

  @@id([reward_id, user_id])
}

model StaffRequest {
  id           String   @id @default(uuid())
  subject      String   @db.VarChar(150)
  message      String   @db.Text
  date_sending DateTime @db.Date
  user         User     @relation(fields: [user_id], references: [id])
  user_id      String
}

model CommunityMessage {
  id       String @id @default(uuid())
  subject  String @db.VarChar(150)
  content  String @db.Text
  user     User   @relation(fields: [user_id], references: [id])
  user_id  String
}

model FictiveAccount {
  id            String @id @default(uuid())
  solde         Int
  number_account Int
  user          User  @relation(fields: [user_id], references: [id])
  user_id       String
}

model Category {
  id       String    @id @default(uuid())
  name     String    @db.VarChar(80)
  articles Article[]
  courses  Course[]
}

model Answer {
  id             String      @id @default(uuid())
  answer         String      @db.VarChar(255)
  correct_answer Boolean
  questionary    Questionary @relation(fields: [questionary_id], references: [id])
  questionary_id String
  question       Question    @relation(fields: [question_id], references: [id]) 
  question_id    String      
}

model Question {
  id            String      @id @default(uuid())
  question      String      @db.VarChar(255) 
  questionary   Questionary @relation(fields: [questionary_id], references: [id])
  questionary_id String
  answers       Answer[]
}



import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany()
  console.log(users)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

  
DATABASE_URL="file:./dev.db"


// export const notifySignup = (data: SignupValidator) => {
//   const nameRegex = /^.{3,50}$/;
//   const firstNameRegex = /^.{3,80}$/;
//   const pseudoRegex = /^.{3,}$/;
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const passwordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

//   if (!nameRegex.test(data.firstname)) {
//     notifyError('Le nom doit avoir entre 3 et 50 caractères');
//     return;
//   }

//   if (!firstNameRegex.test(data.lastname)) {
//     notifyError('Le prénom doit avoir entre 3 et 80 caractères');
//     return;
//   }

//   if (!pseudoRegex.test(data.pseudo)) {
//     notifyError('Le pseudo doit avoir au moins 3 caractères');
//     return;
//   }

//   if (!emailRegex.test(data.mail)) {
//     notifyError("L'email n'est pas valide");
//     return;
//   }

//   if (!passwordRegex.test(data.password)) {
//     notifyError(
//       'Le mot de passe doit avoir au moins 12 caractères et contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
//     );
//     return;
//   }

//   if (data.password !== data.confirmPassword) {
//     notifyError('Les mots de passe ne correspondent pas');
//     return;
//   }

//   if (!data.dateOfBirth) {
//     notifyError("Veuillez entrer votre date de naissance");
//     return;
//   }

//   const currentDate = new Date();
// const birthDate = new Date(data.dateOfBirth);
// const age = currentDate.getFullYear() - birthDate.getFullYear();

// if (age > 100) {
//   notifyError('Vous ne pouvez pas avoir plus de 100 ans');
//   return;
// } else if (age < 10) {
//   notifyError('Vous devez avoir au moins 10 ans ou contacter le support via contact.');
//   return;
// }

// //   if (!data.country) {
// //     notifyError("Veuillez sélectionner un pays");
// //     return;
// //   }

// if (!data.isTermsAccepted) {
//   notifyError("Vous devez accepter les conditions d'utilisation");
//   return;
// }
//   notifySucces('Inscription réussie');
// };


Google app password -> oaij anyr zydw arfv