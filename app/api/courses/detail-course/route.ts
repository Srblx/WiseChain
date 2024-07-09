// Utils
import { prisma } from '@/utils/constante.utils';

// Lib Next
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('id');

  try {
    if (!courseId)
      return NextResponse.json({ error: 'Param not found' }, { status: 404 });

    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
      },
      include: {
        sequences: true,
      },
    });

    return NextResponse.json({ course });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Error fetching course' },
      { status: 500 }
    );
  }
}
