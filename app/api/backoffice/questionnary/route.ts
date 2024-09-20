import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from '@/utils/constante.utils';
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
console.log(questionaries.map(q => q.questions));
    return NextResponse.json({ questionaries });
  } catch (error) {
    console.error('Error fetching questionaries:', error);
    return NextResponse.json(
      { error: 'Error fetching questionaries' },
      { status: 500 }
    );
  }
}
