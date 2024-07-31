// Utils
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';

// Helpers
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Lib Next
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { oldPassword, newPassword, confirmPassword } = await request.json();

  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.TOKEN_REQUIRED },
        { status: 401 }
      );
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
      if (typeof decodedToken === 'string' || !decodedToken.userId) {
        return NextResponse.json(
          { error: ERROR_MESSAGES.INVALID_TOKEN },
          { status: 401 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_TOKEN },
        { status: 401 }
      );
    }

    const userId = decodedToken.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.USER_NOT_FOUND },
        { status: 404 }
      );
    }

    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isOldPasswordCorrect) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.OLD_PASSSWORD_INCORRECT },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NEW_PASSWORD_CONFIRM_PASSWORD_NOT_MATCH },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: SUCCESS_MESSAGES.UPDATE_PASSWORD });
  } catch (error) {
    console.error(ERROR_MESSAGES.UPDATE_PASSWORD, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.UPDATE_PASSWORD },
      { status: 500 }
    );
  }
}
