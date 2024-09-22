// Utils
import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';

// Lib Next
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
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
        { error: ERROR_MESSAGES.USER_NOT_FOUND },
        { status: 404 }
      );
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({
      message: SUCCESS_MESSAGES.DELETE_ACCOUNT,
    });
  } catch (error) {
    console.error(ERROR_MESSAGES.ERROR_DELETE_ACCOUNT, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.ERROR_DELETE_ACCOUNT },
      { status: 500 }
    );
  }
}
