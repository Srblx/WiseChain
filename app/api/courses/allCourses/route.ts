// Utils
import { prisma } from '@/utils/constante.utils';

// Lib Next
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    if (!category)
      return NextResponse.json({ error: 'Param not found' }, { status: 404 });

    const courseCategory = await prisma.category.findFirst({
      where: {
        name: category,
      },
    });

    if (!courseCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
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
      take: 5,
      orderBy: {
        created_at: 'desc',
      },
    });

    console.log('course:', course);
    return NextResponse.json({ course });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Error fetching courses' },
      { status: 500 }
    );
  }
}
