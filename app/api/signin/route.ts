//  Utils
import {
  JWT_EXPIRES_IN_5_DAYS,
  JWT_SECRET,
  prisma,
} from '@/_utils/constante.utils';

// Interfaces
import { LoginData } from '@/interfaces/auth/auth.interface';

// Helpers
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Lib Next
import { NextRequest, NextResponse } from 'next/server';

function validateLoginData(data: LoginData): boolean {
  return !!data.mail && !!data.password;
}

async function findUserByEmail(mail: string) {
  return prisma.user.findUnique({ where: { mail } });
}

async function isPasswordValid(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

function createToken(userId: string, pseudo: string): string {
  return jwt.sign({ userId, pseudo }, JWT_SECRET!, {
    expiresIn: JWT_EXPIRES_IN_5_DAYS,
  });
}

export async function POST(request: NextRequest) {
  const data: LoginData = await request.json();

  if (!validateLoginData(data)) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  const { mail, password } = data;

  try {
    const user = await findUserByEmail(mail);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (!(await isPasswordValid(password, user.password))) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = createToken(user.id, user.pseudo);

    return NextResponse.json({ token, pseudo: user.pseudo });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
