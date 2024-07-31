// Utils
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES } from '@/utils/messages.utils';

// Lib Next
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const recentArticles = await prisma.article.findMany({
      include: {
        user: {
          select: {
            pseudo: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
      take: 6,
      orderBy: {
        created_at: 'desc',
      },
    });

    if (!recentArticles || recentArticles.length === 0) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.ARTICLE_NOT_FOUND },
        { status: 404 }
      );
    }

    return NextResponse.json({ recentArticles });
  } catch (error) {
    console.error(ERROR_MESSAGES.ERROR_FETCHING_ARTICLE, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.ERROR_FETCHING_ARTICLE },
      { status: 500 }
    );
  }
}
