// Lib Next
import { NextResponse } from 'next/server';

// Routes
import { getUserByMail } from '../claimResetPassword/route';

// Utils
import { ERROR_MESSAGES } from '@/utils/messages.utils';

// Helpers
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { mail } = await request.json();

  try {
    const user = await getUserByMail(mail);

    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.USER_NOT_FOUND },
        { status: 404 }
      );
    }

    const token = jwt.sign(
      { userId: user.id, pseudo: user.pseudo },
      process.env.JWT_SECRET!,
      { expiresIn: '5m' }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error(ERROR_MESSAGES.GENERATE_TOKEN, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      { status: 500 }
    );
  }
}
