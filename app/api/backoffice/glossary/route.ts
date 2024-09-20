import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES } from '@/utils/messages.utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const tokenResult = verifyAndDecodeToken(request);

    if (tokenResult instanceof NextResponse) {
      return tokenResult;
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '15', 10);
    const sortBy = searchParams.get('sortBy') || 'title';
    const sortOrder = searchParams.get('sortOrder') === 'desc' ? 'desc' : 'asc';
    const skip = (page - 1) * limit;

    const [glossaryItems, totalCount] = await Promise.all([
      prisma.glossary.findMany({
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      prisma.glossary.count(),
    ]);

    if (!glossaryItems || glossaryItems.length === 0) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NO_GLOSSARY_FOUND },
        { status: 404 }
      );
    }

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      glossaryItems,
      pagination: {
        page,
        limit,
        totalPages,
        totalCount,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.ERROR_FETCHING_GLOSSARY },
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

    const body = await request.json();
    const { title, definition } = body;

    if (!title || !definition) {
      return NextResponse.json(
        { error: 'Title and definition are required' },
        { status: 400 }
      );
    }

    const newGlossaryItem = await prisma.glossary.create({
      data: {
        title,
        definition,
      },
    });

    return NextResponse.json({ newGlossaryItem });
  } catch (error) {
    console.error('Error adding glossary term:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.ERROR_ADDING_GLOSSARY },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const tokenResult = verifyAndDecodeToken(request);

    if (tokenResult instanceof NextResponse) {
      return tokenResult;
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const deletedGlossaryItem = await prisma.glossary.delete({
      where: { id },
    });

    return NextResponse.json({ deletedGlossaryItem });
  } catch (error) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.ERROR_DELETING_GLOSSARY },
      { status: 500 }
    );
  }
}
