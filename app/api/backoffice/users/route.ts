// Enums
import Roles from '@/enums/roles.enum';

// Utils
import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';

// Helpers
import bcrypt from 'bcrypt';

// Next libs
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const tokenResult = verifyAndDecodeToken(request);

    if (tokenResult instanceof NextResponse) {
      return tokenResult;
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '15');
    const skip = (page - 1) * limit;

    const [users, totalUsers] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
      }),
      prisma.user.count(),
    ]);

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
        page,
        limit,
        pages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.ERROR_FETCHING_USER },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const tokenResult = verifyAndDecodeToken(request);

    if (tokenResult instanceof NextResponse) {
      return tokenResult;
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
    } = body;

    // Validation des champs obligatoires
    if (!firstname || !lastname || !pseudo || !mail || !password || !date_of_birth) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis" },
        { status: 400 }
      );
    }

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

    const birthDate = new Date(date_of_birth);
    if (isNaN(birthDate.getTime())) {
      return NextResponse.json(
        { error: "Date de naissance invalide" },
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
        date_of_birth: birthDate,
        roles: roles || Roles.USER,
        profile_img,
        is_verified: is_verified || false,
        is_revoice: false,
        created_at: new Date(),
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error: any) {
    console.error("Erreur détaillée:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.ADD_USER_ERROR, details: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(request: NextRequest) {
  try {
    const tokenResult = verifyAndDecodeToken(request);

    if (tokenResult instanceof NextResponse) {
      return tokenResult;
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
