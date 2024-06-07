// Utils
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';

// Helpers
import jwt from 'jsonwebtoken';

// Lib Next
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const { firstname, lastname, pseudo } = await request.json();

  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
      if (typeof decodedToken === 'string' || !decodedToken.userId) {
        return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
      }
    } catch (error) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
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
