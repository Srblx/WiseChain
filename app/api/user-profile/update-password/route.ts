// Utils
import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';

// Helpers
import bcrypt from 'bcrypt';

// Lib Next
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const tokenResult = verifyAndDecodeToken(request);

    if (tokenResult instanceof NextResponse) {
      return tokenResult;
    }

    const userId = tokenResult.userId;

    const { oldPassword, newPassword, confirmPassword } = await request.json();

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