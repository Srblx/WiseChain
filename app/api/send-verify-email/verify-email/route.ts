// Utils
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';

// Helpers
import jwt from 'jsonwebtoken';

// Lib Next
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const { token } = await request.json();

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    const userId = decodedToken.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const mail = user?.mail;

    await prisma.user.update({
      where: { mail: mail },
      data: { is_verified: true },
    });

    return NextResponse.json(
      { message: SUCCESS_MESSAGES.EMAIL_VERIFY },
      { status: 200 }
    );
  } catch (error) {
    console.error(ERROR_MESSAGES.EMAIL_VERIFY, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.EMAIL_VERIFY },
      { status: 500 }
    );
  }
}
