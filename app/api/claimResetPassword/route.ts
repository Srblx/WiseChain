"use server";

// Helpers
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
