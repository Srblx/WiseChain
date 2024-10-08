// Utils
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES_EN } from '@/utils/messages.utils';

// Next Libs
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('id');

  try {
    if (!courseId)
      return NextResponse.json(
        { error: ERROR_MESSAGES_EN.NOT_PARAMS_FOUND },
        { status: 404 }
      );

    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
      },
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

    const tools = course.tool_courses.map((tc) => tc.tool);

    return NextResponse.json({
      course: {
        ...course,
        tool_courses: undefined,
      },
      tools,
    });
  } catch (error) {
    console.error(ERROR_MESSAGES_EN.ERROR_FETCHING_COURSE, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES_EN.ERROR_FETCHING_COURSE },
      { status: 500 }
    );
  }
}
