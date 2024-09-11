// Utils
import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';

// Lib Next
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const tokenResult = verifyAndDecodeToken(request);

    if (tokenResult instanceof NextResponse) {
      return tokenResult;
    }

    const userId = tokenResult.userId;

    const { firstname, lastname, pseudo } = await request.json();

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

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstname,
        lastname,
        pseudo,
      },
    });

    return NextResponse.json({
      message: SUCCESS_MESSAGES.UPDATE_PROFILE,
      user: updatedUser,
    });
  } catch (error) {
    console.error(ERROR_MESSAGES.UPDATE_PROFILE, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.UPDATE_PROFILE },
      { status: 500 }
    );
  }
}