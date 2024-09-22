import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES } from '@/utils/messages.utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const tokenResult = verifyAndDecodeToken(request);
    if (tokenResult instanceof NextResponse) return tokenResult;

    const courses = await prisma.course.findMany({
      include: {
        sequences: true,
        category: { select: { name: true } },
        tool_courses: {
          select: {
            tool: {
              select: { id: true, name: true, link: true, img: true },
            },
          },
        },
      },
      orderBy: { created_at: 'asc' },
    });

    const formattedCourses = courses.map((course) => ({
      ...course,
      mainTitle: course.main_title,
      tools: course.tool_courses.map((tc) => tc.tool),
    }));

    return NextResponse.json({ courses: formattedCourses });
  } catch (error) {
    console.error(ERROR_MESSAGES.ERROR_FETCHING_COURSE, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.ERROR_FETCHING_COURSE },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const tokenResult = verifyAndDecodeToken(request);
    if (tokenResult instanceof NextResponse) return tokenResult;

    const data = await request.json();
    const {
      mainTitle,
      description,
      img,
      content,
      category,
      difficulty,
      sequences,
      tools,
    } = data;

    if (!mainTitle || !content || !category) {
      return NextResponse.json(
        { error: 'Le titre, le contenu, et la catégorie sont requis.' },
        { status: 400 }
      );
    }

    const newCourse = await prisma.course.create({
      data: {
        main_title: mainTitle,
        description,
        img,
        content,
        category: { connect: { id: category } },
        difficulty,
        sequences: {
          create:
            sequences?.map((seq: any) => ({
              index: seq.index,
              title: seq.title,
              containt: seq.content,
              img: seq.img,
            })) || [],
        },
        tool_courses: {
          create:
            tools?.map((toolId: string) => ({
              tool: { connect: { id: toolId } },
            })) || [],
        },
      },
      include: {
        sequences: true,
        category: { select: { name: true } },
        tool_courses: {
          select: {
            tool: {
              select: { id: true, name: true, link: true, img: true },
            },
          },
        },
      },
    });

    const formattedNewCourse = {
      ...newCourse,
      mainTitle: newCourse.main_title,
      tools: newCourse.tool_courses.map((tc) => tc.tool),
    };

    return NextResponse.json({ course: formattedNewCourse }, { status: 201 });
  } catch (error) {
    console.error(ERROR_MESSAGES.ADD_COURSE_ERROR, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.ADD_COURSE_ERROR },
      { status: 500 }
    );
  }
}
