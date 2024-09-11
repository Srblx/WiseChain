// Utils
import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES } from '@/utils/messages.utils';

// Next Libs 
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const tokenResult = verifyAndDecodeToken(request);

    if (tokenResult instanceof NextResponse) {
      return tokenResult;
    }

    const userId = tokenResult.userId;

    const categories = await prisma.category.findMany({});
    return NextResponse.json({ categories });
  } catch (error) {
    console.error(ERROR_MESSAGES.ERROR_FETCHING_CATEGORY, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.ERROR_FETCHING_CATEGORY },
      { status: 500 }
    );
  }
}