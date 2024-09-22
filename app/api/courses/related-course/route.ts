// Utils
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES_EN } from '@/utils/messages.utils';

// Next Libs
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('id');

  if (!courseId) {
    return NextResponse.json(
      { error: ERROR_MESSAGES_EN.ID_COURSE_REQUIRED },
      { status: 400 }
    );
  }

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        category: true,
        sequences: true,
        tool_courses: {
          include: {
            tool: true,
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: ERROR_MESSAGES_EN.NOT_COURSE_FOUND },
        { status: 404 }
      );
    }

    const relatedCourses = await prisma.course.findMany({
      where: {
        category_id: course.category_id,
        id: { not: courseId },
      },
      take: 6,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        main_title: true,
        // mainTitle: true,
        img: true,
        description: true,
        created_at: true,
        sequences: {
          select: { id: true },
        },
        category: {
          select: { name: true },
        },
      },
    });

    if (relatedCourses.length === 0) {
      return NextResponse.json({ message: ERROR_MESSAGES_EN }, { status: 200 });
    }

    const formattedCourses = relatedCourses.map((course) => ({
      ...course,
      sequences: course.sequences.length,
      category_name: course.category.name,
    }));

    return NextResponse.json({
      courses: formattedCourses,
      category_name: course.category.name,
    });
  } catch (error) {
    console.error(ERROR_MESSAGES_EN.ERROR_FETCHING_COURSE, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES_EN.ERROR_FETCH_RELATED_COURSES },
      { status: 500 }
    );
  }
}
