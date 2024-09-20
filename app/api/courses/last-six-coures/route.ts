// Utils
import { prisma } from '@/utils/constante.utils';
import { CATEGORY, ERROR_MESSAGES_EN } from '@/utils/messages.utils';

// Lib Next
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = [
      CATEGORY.INVESTMENT,
      CATEGORY.CRYPTO,
      CATEGORY.BLOCKCHAIN,
      CATEGORY.NFT,
    ];
    const coursesData = await Promise.all(
      categories.map(async (categoryName) => {
        const category = await prisma.category.findFirst({
          where: { name: categoryName },
        });

        if (!category) {
          return { categoryName, courses: [] };
        }

        const courses = await prisma.course.findMany({
          where: { category_id: category.id },
          include: { sequences: true },
          take: 6,
          orderBy: { created_at: 'asc' },
        });

        return { categoryName, courses };
      })
    );

    const result = Object.fromEntries(
      coursesData.map(({ categoryName, courses }) => [categoryName, courses])
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error(ERROR_MESSAGES_EN.ERROR_FETCHING_COURSE, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES_EN.ERROR_FETCHING_COURSE },
      { status: 500 }
    );
  }
}
