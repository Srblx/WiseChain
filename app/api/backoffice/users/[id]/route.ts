// Utils
import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES } from '@/utils/messages.utils';

// Helpers
import bcrypt from 'bcrypt';

// Next libs
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const tokenResult = verifyAndDecodeToken(request);

    if (tokenResult instanceof NextResponse) {
      return tokenResult;
    }

    const authenticatedUserId = tokenResult.userId;

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
      date_of_birth,
      roles,
      profile_img,
      is_verified,
      is_revoice,
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
        firstname: firstname || existingUser.firstname,
        lastname: lastname || existingUser.lastname,
        pseudo: pseudo ? pseudo.trim().toLowerCase() : existingUser.pseudo,
        mail: mail ? mail.trim().toLowerCase() : existingUser.mail,
        password: hashedPassword,
        country: country || existingUser.country,
        date_of_birth: date_of_birth
          ? new Date(date_of_birth)
          : existingUser.date_of_birth,
        roles: roles || existingUser.roles,
        profile_img: profile_img || existingUser.profile_img,
        is_verified:
          is_verified !== undefined ? is_verified : existingUser.is_verified,
        is_revoice:
          is_revoice !== undefined ? is_revoice : existingUser.is_revoice,
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
