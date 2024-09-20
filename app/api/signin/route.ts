//  Utils
import {
  JWT_EXPIRES_IN_5_DAYS,
  JWT_SECRET,
  prisma,
} from '@/utils/constante.utils';
import { ERROR_MESSAGES_EN } from '@/utils/messages.utils';

// Interfaces
import { LoginData } from '@/interfaces/auth/auth.interface';

// Helpers
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Lib Next
import { getPresignedUrl } from '@/utils/minio.utils';
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
      { error: ERROR_MESSAGES_EN.EMAIL_PASSWORD_REQUIRED },
      { status: 400 }
    );
  }

  const { mail, password } = data;

  try {
    const user = await findUserByEmail(mail);

    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES_EN.INVALID_EMAIL_PASSWORD },
        { status: 401 }
      );
    }

    if (!(await isPasswordValid(password, user.password))) {
      return NextResponse.json(
        { error: ERROR_MESSAGES_EN.ERROR_PASSWORD_OR_MAIL },
        { status: 401 }
      );
    }

    const token = createToken(user.id, user.pseudo);

    return NextResponse.json({ token, user: user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: ERROR_MESSAGES_EN.INTERNAL_SERVER_ERROR },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json(
      { error: ERROR_MESSAGES_EN.AUTH_HEADER_REQUIRED },
      { status: 401 }
    );
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return NextResponse.json({ error: ERROR_MESSAGES_EN.TOKEN_REQUIRED });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })
    .then(async (user) => ({ ...user, profile_img: await getPresignedUrl(user?.profile_img ?? '') }));

    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES_EN.USERS_NOT_FOUND },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: ERROR_MESSAGES_EN.INVALID_TOKEN },
      { status: 401 }
    );
  }
}
