// pages/api/questionnary.ts

import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const courseId = url.searchParams.get('courseId');
  const userId = url.searchParams.get('userId');  // Paramètre pour vérifier les résultats précédents

  if (courseId) {
    if (typeof courseId !== 'string') {
      return NextResponse.json({ error: 'Invalid courseId' }, { status: 400 });
    }

    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
      if (typeof decodedToken === 'string' || !decodedToken.userId) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    try {
      const questionnary = await prisma.questionary.findFirst({
        where: { courseId },
        include: { questions: { include: { answers: true } } },
      });

      if (!questionnary) {
        return NextResponse.json({ error: 'Questionnary not found' }, { status: 404 });
      }
      return NextResponse.json(questionnary);
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }

  if (userId) {
    if (typeof userId !== 'string') {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
    }

    const questionaryId = url.searchParams.get('questionaryId');
    if (!questionaryId) {
      return NextResponse.json({ error: 'Missing questionaryId' }, { status: 400 });
    }

    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
      if (typeof decodedToken === 'string' || !decodedToken.userId) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    try {
      const existingRecord = await prisma.realizeQuestionary.findFirst({
        where: { user_id: userId, questionary_id: questionaryId },
      });

      return NextResponse.json({ exists: !!existingRecord });
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { score, date_of_realize_questionary, user_id, questionary_id } = data;

    if (typeof score !== 'number' || !date_of_realize_questionary || typeof user_id !== 'string' || typeof questionary_id !== 'string') {
      return NextResponse.json({ error: 'Missing fields in request' }, { status: 400 });
    }

    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
      if (typeof decodedToken === 'string' || !decodedToken.userId) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const existingRecord = await prisma.realizeQuestionary.findFirst({
      where: { user_id, questionary_id },
    });

    if (existingRecord) {
      // Update if the new score is higher
      if (score > existingRecord.score) {
        await prisma.realizeQuestionary.update({
          where: { id: existingRecord.id },
          data: { score, date_of_realize_questionary: new Date(date_of_realize_questionary) },
        });
      }
    } else {
      // Create new record
      await prisma.realizeQuestionary.create({
        data: {
          score,
          date_of_realize_questionary: new Date(date_of_realize_questionary),
          user_id,
          questionary_id,
        },
      });
    }

    return NextResponse.json({ message: 'Result saved successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
