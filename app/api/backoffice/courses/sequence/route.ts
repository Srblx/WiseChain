import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES } from '@/utils/messages.utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const tokenResult = verifyAndDecodeToken(request);

    if (tokenResult instanceof NextResponse) {
      return tokenResult;
    }

    const courses = await prisma.course.findMany({
      select: {
        main_title: true,
        sequences: {
          select: {
            index: true,
            title: true,
            containt: true,
            img: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
console.log(courses)
console.log('Courses:', courses.map(c => c.sequences))    
    return NextResponse.json({ courses });
  } catch (error) {
    console.error(ERROR_MESSAGES.ERROR_FETCHING_COURSE, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.ERROR_FETCHING_COURSE },
      { status: 500 }
    );
  }
}
