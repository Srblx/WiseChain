// Utils
import { prisma } from '@/utils/constante.utils';

// Lib Next
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const recentArticles = await prisma.article.findMany({
      include: {
        user: {
          select: {
            pseudo: true,
          }
        },
        category: {
          select: {
            name: true
          }
        }
      },
      take: 6,
      orderBy: {
        created_at: 'desc',
      },
    });

    if (!recentArticles || recentArticles.length === 0) {
      return NextResponse.json(
        { error: 'No articles found' },
        { status: 404 }
      );
    }
    console.log(recentArticles);

    return NextResponse.json({ recentArticles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Error fetching articles' },
      { status: 500 }
    );
  }
}