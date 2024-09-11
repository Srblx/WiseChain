// Utils
import { ERROR_MESSAGES } from '@/utils/messages.utils';

// Helpers 
import jwt from 'jsonwebtoken';

// Next Libs
import { NextResponse } from 'next/server';

interface DecodedToken {
  userId: string;
}

export function verifyAndDecodeToken(request: Request): NextResponse | DecodedToken {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.MISSING_TOKEN },
      { status: 401 }
    );
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    if (!decodedToken.userId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_TOKEN },
        { status: 401 }
      );
    }
    return decodedToken;
  } catch (error) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.INVALID_TOKEN },
      { status: 401 }
    );
  }
}