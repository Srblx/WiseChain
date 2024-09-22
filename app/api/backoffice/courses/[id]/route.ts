// Utils
import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES_EN, SUCCESS_MESSAGES_EN } from '@/utils/messages.utils';

// Next Libs
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const tokenResult = verifyAndDecodeToken(request);

    if (tokenResult instanceof NextResponse) {
      return tokenResult;
    }

    const userId = tokenResult.userId;

    const url = new URL(request.url);
    const courseId = url.pathname.split('/').pop();

    if (!courseId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES_EN.MISSING_COURSE_ID },
        { status: 400 }
      );
    }

    const body = await request.json();

    let category;

    const isUuid =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        body.category
      );

    if (isUuid) {
      category = await prisma.category.findFirst({
        where: { id: body.category },
      });
    } else {
      category = await prisma.category.findFirst({
        where: { name: body.category },
      });
    }

    if (!category) {
      return NextResponse.json(
        { error: "La catégorie spécifiée n'existe pas." },
        { status: 400 }
      );
    }

    const updatedCourse = await prisma.course.update({
      where: {
        id: courseId,
      },
      include: {
        sequences: true,
      },
      data: {
        main_title: body.mainTitle,
        description: body.description,
        img: body.img,
        content: body.content,
        category: {
          connect: {
            id: category.id,
          },
        },
        difficulty: body.difficulty,
      },
    });

    return NextResponse.json({ updatedCourse });
  } catch (error) {
    console.error(ERROR_MESSAGES_EN.ERROR_UPDATE_COURSE, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES_EN.ERROR_UPDATE_COURSE },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tokenResult = verifyAndDecodeToken(request);

    if (tokenResult instanceof NextResponse) {
      return tokenResult;
    }

    const courseId = params.id;

    if (!courseId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES_EN.MISSING_COURSE_ID },
        { status: 400 }
      );
    }

    const existingCourse = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!existingCourse) {
      return NextResponse.json(
        { error: ERROR_MESSAGES_EN.COURSE_NOT_FOUND },
        { status: 404 }
      );
    }

    await prisma.$transaction([
      // Supprimer les ToolCourse associés
      prisma.toolCourse.deleteMany({
        where: { course_id: courseId },
      }),
      // Supprimer les Sequence associées
      prisma.sequence.deleteMany({
        where: { course_id: courseId },
      }),
      // Supprimer les Questionary associés
      prisma.questionary.deleteMany({
        where: { courseId: courseId },
      }),
      // Finalement, supprimer le cours
      prisma.course.delete({
        where: { id: courseId },
      }),
    ]);

    return NextResponse.json(
      { message: SUCCESS_MESSAGES_EN.COURSE_DELETED_SUCCESSFULLY },
      { status: 200 }
    );
  } catch (error) {
    console.error(ERROR_MESSAGES_EN.ERROR_DELETE_COURSE, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES_EN.ERROR_DELETE_COURSE },
      { status: 500 }
    );
  }
}
