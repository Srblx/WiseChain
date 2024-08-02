// Utils
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';

// Next Libs
import { NextResponse } from 'next/server';

// HelpersÒ
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const courseId = url.searchParams.get('courseId');

  if (!courseId || typeof courseId !== 'string') {
    return NextResponse.json(
      { error: ERROR_MESSAGES.MISSING_COURSE_ID },
      { status: 400 }
    );
  }

  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.MISSING_TOKEN },
      { status: 401 }
    );
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decodedToken === 'string' || !decodedToken.userId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_TOKEN },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(ERROR_MESSAGES.JWT_ERROR, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.INVALID_TOKEN },
      { status: 401 }
    );
  }

  try {
    const questionary = await prisma.questionary.findFirst({
      where: {
        courseId: courseId,
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    if (!questionary) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.QUESTIONARY_NOT_FOUND },
        { status: 404 }
      );
    }
    return NextResponse.json(questionary);
  } catch (error) {
    console.error(ERROR_MESSAGES.INTERNAL_ERROR, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_ERROR },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { score, date_of_realize_questionary, user_id, questionary_id } = data;

    if (typeof score !== 'number' || !date_of_realize_questionary || typeof user_id !== 'string' || typeof questionary_id !== 'string') {
      console.error(ERROR_MESSAGES.MISSING_FIELDS, { score, date_of_realize_questionary, user_id, questionary_id });
      return NextResponse.json(
        { error: ERROR_MESSAGES.MISSING_FIELDS },
        { status: 400 }
      );
    }

    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      console.error(ERROR_MESSAGES.MISSING_TOKEN);
      return NextResponse.json(
        { error: ERROR_MESSAGES.MISSING_TOKEN },
        { status: 401 }
      );
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
      if (typeof decodedToken === 'string' || !decodedToken.userId) {
        console.error(ERROR_MESSAGES.INVALID_TOKEN, decodedToken);
        return NextResponse.json(
          { error: ERROR_MESSAGES.INVALID_TOKEN },
          { status: 401 }
        );
      }
    } catch (error) {
      console.error(ERROR_MESSAGES.JWT_ERROR, error);
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_TOKEN },
        { status: 401 }
      );
    }

    await prisma.realizeQuestionary.create({
      data: {
        score,
        date_of_realize_questionary: new Date(date_of_realize_questionary),
        user_id,
        questionary_id
      },
    });

    return NextResponse.json({ message: SUCCESS_MESSAGES.RESULT_SAVED });
  } catch (error) {
    console.error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      { status: 500 }
    );
  }
}
