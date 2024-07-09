import { prisma } from '@/utils/constante.utils';
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
      return NextResponse.json({ error: 'No articles found' }, { status: 404 });
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
      { error: 'Error fetching articles' },
      { status: 500 }
    );
  }
}
