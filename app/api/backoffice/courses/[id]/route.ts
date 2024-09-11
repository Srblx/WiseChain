// Utils
import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES } from '@/utils/messages.utils';

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
        { error: ERROR_MESSAGES.MISSING_COURSE_ID },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log('body', body);

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

    console.log('category', category);

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

    console.log('updated', updatedCourse);
    return NextResponse.json({ updatedCourse });
  } catch (error) {
    console.error(ERROR_MESSAGES.ERROR_UPDATE_COURSE, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.ERROR_UPDATE_COURSE },
      { status: 500 }
    );
  }
}