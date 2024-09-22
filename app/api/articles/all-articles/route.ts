// Utils
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES_EN } from '@/utils/messages.utils';

// Next Libs
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const page = 1;
    const limit = 15;

    const articles = await prisma.article.findMany({
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
      orderBy: {
        created_at: 'desc',
      },
      take: limit,
    });

    const totalArticles = await prisma.article.count();

    if (!articles || articles.length === 0) {
      return NextResponse.json(
        { error: ERROR_MESSAGES_EN.ARTICLE_NOT_FOUND },
        { status: 404 }
      );
    }

    return NextResponse.json({
      articles,
      pagination: {
        total: totalArticles,
        page,
        limit,
        pages: Math.ceil(totalArticles / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: ERROR_MESSAGES_EN.ERROR_FETCHING_ARTICLE },
      { status: 500 }
    );
  }
}
