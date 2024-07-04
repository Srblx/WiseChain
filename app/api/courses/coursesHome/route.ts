// Utils
import { prisma } from '@/utils/constante.utils';

// Lib Next
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = ['Investissement', 'Crypto-monnaie', 'Blockchain'];
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
          orderBy: { created_at: 'desc' },
        });

        return { categoryName, courses };
      })
    );

    const result = Object.fromEntries(
      coursesData.map(({ categoryName, courses }) => [categoryName, courses])
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Error fetching courses' },
      { status: 500 }
    );
  }
}
