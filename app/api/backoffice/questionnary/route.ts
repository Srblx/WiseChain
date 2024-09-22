// Utils
import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES_EN } from '@/utils/messages.utils';

// Next Libs
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const tokenResult = verifyAndDecodeToken(request);

  if (tokenResult instanceof NextResponse) {
    return tokenResult;
  }

  try {
    const questionaries = await prisma.questionary.findMany({
      include: {
        course: { select: { main_title: true } },
        questions: {
          include: {
            answers: {
              select: {
                answer: true,
                correct_answer: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ questionaries });
  } catch (error) {
    console.error(ERROR_MESSAGES_EN.ERROR_FETCHING_QUESTIONARY, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES_EN.ERROR_FETCHING_QUESTIONARY },
      { status: 500 }
    );
  }
}
