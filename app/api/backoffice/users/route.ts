// Enums
import Roles from '@/enums/roles.enum';

// Utils
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';

// Helpers
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Next libs
import { NextResponse } from 'next/server';

const verifyToken = (request: Request) => {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return { error: ERROR_MESSAGES.MISSING_TOKEN, status: 401 };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return { decoded };
  } catch (error) {
    return { error: ERROR_MESSAGES.INVALID_TOKEN, status: 403 };
  }
};

export async function GET(request: Request) {
  try {
    const tokenResult = verifyToken(request);
    if ('error' in tokenResult) {
      return NextResponse.json(
        { error: tokenResult.error },
        { status: tokenResult.status }
      );
    }

    const users = await prisma.user.findMany({});
    const totalUsers = await prisma.user.count();

    if (!users || users.length === 0) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.USER_NOT_FOUND },
        { status: 404 }
      );
    }

    return NextResponse.json({
      users,
      pagination: {
        total: totalUsers,
        page: 1,
        limit: 15,
        pages: Math.ceil(totalUsers / 15),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.ERROR_FETCHING_USER },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const tokenResult = verifyToken(request);
    if ('error' in tokenResult) {
      return NextResponse.json(
        { error: tokenResult.error },
        { status: tokenResult.status }
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
      birthOfDate,
      roles,
      profile_img,
      isVerified,
    } = body;

    const normalizedPseudo = pseudo.trim().toLowerCase();
    const normalizedMail = mail.trim().toLowerCase();

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ pseudo: normalizedPseudo }, { mail: normalizedMail }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.USER_ALREADY_EXISTS },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstname,
        lastname,
        pseudo: normalizedPseudo,
        mail: normalizedMail,
        password: hashedPassword,
        country: country || 'france',
        date_of_birth: new Date(birthOfDate),
        roles: roles || Roles.USER,
        profile_img,
        is_verified: isVerified || false,
        is_revoice: false,
        created_at: new Date(),
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error(ERROR_MESSAGES.ADD_USER_ERROR, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.ADD_USER_ERROR },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const tokenResult = verifyToken(request);
    if ('error' in tokenResult) {
      return NextResponse.json(
        { error: tokenResult.error },
        { status: tokenResult.status }
      );
    }

    const url = new URL(request.url);
    const userId = url.searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.MISSING_USER_ID },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.USER_NOT_FOUND },
        { status: 404 }
      );
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      { message: SUCCESS_MESSAGES.USER_SUCCESSFULLY_DELETE },
      { status: 200 }
    );
  } catch (error) {
    console.error(ERROR_MESSAGES.DELETE_USER_ERROR, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.DELETE_USER_ERROR },
      { status: 500 }
    );
  }
}
