// Utils
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES } from '@/utils/messages.utils';

// Lib Next
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    if (!category)
      return NextResponse.json(
        { error: ERROR_MESSAGES.NOT_PARAMS_FOUND },
        { status: 404 }
      );

    const courseCategory = await prisma.category.findFirst({
      where: {
        name: category,
      },
    });

    if (!courseCategory) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NOT_CATEGORY_FOUND },
        { status: 404 }
      );
    }

    const course = await prisma.course.findMany({
      where: {
        category_id: courseCategory.id,
      },
      include: {
        sequences: true,
      },
      // take: 5,
      orderBy: {
        created_at: 'asc',
      },
    });

    return NextResponse.json({ course });
  } catch (error) {
    console.error(ERROR_MESSAGES.ERROR_FETCHING_COURSE, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.ERROR_FETCHING_COURSE },
      { status: 500 }
    );
  }
}
