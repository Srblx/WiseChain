// Utils
import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES } from '@/utils/messages.utils';

// Next Libs
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const tokenResult = verifyAndDecodeToken(request);

    if (tokenResult instanceof NextResponse) {
      return tokenResult;
    }

    const courses = await prisma.course.findMany({
      include: {
        sequences: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        created_at: 'asc',
      },
    });

    const formattedCourses = courses.map((course) => ({
      ...course,
      mainTitle: course.main_title,
    }));

    return NextResponse.json({ course: formattedCourses });
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

    if (tokenResult instanceof NextResponse) {
      return tokenResult;
    }

    const data = await request.json();
    console.log('Données reçues:', data);
    const {
      mainTitle = data.main_title,
      description,
      img,
      content,
      category = data.category_id,
      difficulty,
      sequences,
      tools,
    } = data;

    console.log('Validation des champs 123:', { mainTitle, content, category });
    if (!mainTitle || !content || !category) {
      console.log('Champs manquants:', { mainTitle, content, category });
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
        category: {
          connect: { id: category },
        },
        difficulty,
      },
    });
    console.log('newcours', newCourse);

    if (sequences && sequences.length > 0) {
      await prisma.sequence.createMany({
        data: sequences.map(
          (sequence: {
            index: number;
            title: string;
            content: string;
            img?: string;
          }) => ({
            index: sequence.index,
            title: sequence.title,
            containt: sequence.content,
            img: sequence.img,
            course_id: newCourse.id,
          })
        ),
      });
    }

    if (tools && tools.length > 0) {
      await prisma.toolCourse.createMany({
        data: tools.map((toolId: string) => ({
          tool_id: toolId,
          course_id: newCourse.id,
        })),
      });
    }

    return NextResponse.json({ course: newCourse }, { status: 201 });
  } catch (error) {
    console.error(ERROR_MESSAGES.ADD_COURSE_ERROR, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.ADD_COURSE_ERROR },
      { status: 500 }
    );
  }
}