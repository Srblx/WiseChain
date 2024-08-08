// Utils
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES } from '@/utils/messages.utils';
import { verifyToken } from '../route';

// Helpers
import bcrypt from 'bcrypt';

// Next libs
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const tokenResult = verifyToken(request);
    if ('error' in tokenResult) {
      return NextResponse.json(
        { error: tokenResult.error },
        { status: tokenResult.status }
      );
    }

    const url = new URL(request.url);
    const userId = url.pathname.split('/').pop();

    if (!userId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.MISSING_USER_ID },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      firstname,
      lastname,
      pseudo,
      mail,
      password,
      country,
      dateOfBirth,
      roles,
      profile_img,
      isVerified,
    } = body;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.USER_NOT_FOUND },
        { status: 404 }
      );
    }

    let hashedPassword = existingUser.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstname,
        lastname,
        pseudo: pseudo ? pseudo.trim().toLowerCase() : existingUser.pseudo,
        mail: mail ? mail.trim().toLowerCase() : existingUser.mail,
        password: hashedPassword,
        country: country || existingUser.country,
        date_of_birth: dateOfBirth
          ? new Date(dateOfBirth)
          : existingUser.date_of_birth,
        roles: roles || existingUser.roles,
        profile_img: profile_img || existingUser.profile_img,
        is_verified:
          isVerified !== undefined ? isVerified : existingUser.is_verified,
      },
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error(ERROR_MESSAGES.UPDATE_USER_ERROR, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.UPDATE_USER_ERROR },
      { status: 500 }
    );
  }
}
