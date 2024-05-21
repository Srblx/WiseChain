//Libs Next
import prisma from '@/lib/prisma';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

//Prisma Client

const googleId = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;

if (!googleId || !googleSecret) {
  throw new Error('Missing env variables for authentication');
}

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret,
    }),
  ],
  debug: true,
  adapter: PrismaAdapter(prisma),
} satisfies NextAuthOptions;

export default NextAuth(authConfig);
function PrismaAdapter(prisma: any): import("next-auth/adapters").Adapter | undefined {
  throw new Error('Function not implemented.');
}

