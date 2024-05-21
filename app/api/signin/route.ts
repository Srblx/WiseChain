import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const JWT_EXPIRES_IN = '5d';

interface LoginData {
  mail: string;
  password: string;
}

function validateLoginData(data: LoginData): boolean {
  return !!data.mail && !!data.password;
}

async function findUserByEmail(mail: string) {
  return prisma.user.findUnique({ where: { mail } });
}

async function isPasswordValid(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

function createToken(userId: string, pseudo: string): string {
  return jwt.sign({ userId, pseudo }, JWT_SECRET!, { expiresIn: JWT_EXPIRES_IN });
}

export async function POST(request: NextRequest) {
  const data: LoginData = await request.json();

  if (!validateLoginData(data)) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  const { mail, password } = data;

  try {
    const user = await findUserByEmail(mail);

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (!await isPasswordValid(password, user.password)) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = createToken(user.id, user.pseudo);

    return NextResponse.json({ token, pseudo: user.pseudo });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
