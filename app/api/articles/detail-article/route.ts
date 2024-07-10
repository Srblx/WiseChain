import { prisma } from '@/utils/constante.utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const articleId = searchParams.get('id');

  try {
    if (!articleId) {
      return NextResponse.json({ error: 'Param not found' }, { status: 404 });
    }

    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      include: {
        sequence_article: true,
      },
    });

    return NextResponse.json({ article });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Error fetching article' },
      { status: 500 }
    );
  }
}
