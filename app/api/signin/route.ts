//  Utils
import {
  JWT_EXPIRES_IN_5_DAYS,
  JWT_SECRET,
  prisma,
} from '@/utils/constante.utils';
import { ERROR_MESSAGES } from '@/utils/messages.utils';

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
      { error: ERROR_MESSAGES.EMAIL_PASSWORD_REQUIRED },
      { status: 400 }
    );
  }

  const { mail, password } = data;

  try {
    const user = await findUserByEmail(mail);

    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_EMAIL_PASSWORD },
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

    return NextResponse.json({ token, user: user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.AUTH_HEADER_REQUIRED },
      { status: 401 }
    );
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return NextResponse.json({ error: ERROR_MESSAGES.TOKEN_REQUIRED });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.USER_NOT_FOUND },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.INVALID_TOKEN },
      { status: 401 }
    );
  }
}
