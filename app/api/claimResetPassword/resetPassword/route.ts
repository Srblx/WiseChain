// Utils
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Lib Next
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { newPassword, token } = await request.json();

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    if (typeof decodedToken === 'object' && 'userId' in decodedToken) {
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

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashedPassword,
        },
      });

      return NextResponse.json({
        message: SUCCESS_MESSAGES.RESET_PASSWORD,
      });
    } else {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_TOKEN },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(ERROR_MESSAGES.RESET_PASSWORD, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.RESET_PASSWORD },
      { status: 500 }
    );
  }
}
