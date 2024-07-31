import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES } from '@/utils/messages.utils';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const glossary = await prisma.glossary.findMany({
      orderBy: {
        title: 'asc',
      },
    });

    if (!glossary || glossary.length === 0) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NO_GLOSSARY_FOUND, glossary },
        { status: 404 }
      );
    }

    return NextResponse.json({ glossary });
  } catch (error) {
    console.error('Error fetching glossary:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.ERROR_FETCHING_GLOSSARY },
      { status: 500 }
    );
  }
}
