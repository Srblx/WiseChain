// Utils
import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES_EN, SUCCESS_MESSAGES_EN } from '@/utils/messages.utils';

// Helpers
import bcrypt from 'bcrypt';

// Lib Next
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { newPassword } = await request.json();

    const decodedTokenOrError = verifyAndDecodeToken(request);
    if (decodedTokenOrError instanceof NextResponse) {
      return decodedTokenOrError;
    }

    const userId = decodedTokenOrError.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES_EN.USERS_NOT_FOUND },
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
      message: SUCCESS_MESSAGES_EN.RESET_PASSWORD,
    });
  } catch (error) {
    console.error(ERROR_MESSAGES_EN.RESET_PASSWORD, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES_EN.RESET_PASSWORD },
      { status: 500 }
    );
  }
}
