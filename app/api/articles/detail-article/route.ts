// Utils
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES_EN } from '@/utils/messages.utils';

// Next Libs
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const articleId = searchParams.get('id');

  try {
    if (!articleId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES_EN.NOT_PARAMS_FOUND },
        { status: 404 }
      );
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
    console.error(ERROR_MESSAGES_EN.ERROR_FETCHING_ARTICLE, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES_EN.ERROR_FETCHING_ARTICLE },
      { status: 500 }
    );
  }
}
