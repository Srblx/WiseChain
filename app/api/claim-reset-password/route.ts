'use server';

// Helpers
import { prisma } from '@/utils/constante.utils';


export async function checkEmailExists(mail: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      mail: mail,
    },
  });

  return !!user;
}

export async function getUserByMail(mail: string) {
  const user = await prisma.user.findUnique({
    where: {
      mail: mail,
    },
  });

  return user;
}
