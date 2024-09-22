// Utils
import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from '@/utils/constante.utils';
import { ERROR_MESSAGES_EN } from '@/utils/messages.utils';

// Next libs
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const tokenResult = verifyAndDecodeToken(request);

    if (tokenResult instanceof NextResponse) {
      return tokenResult;
    }

    const { pathname } = request.nextUrl;
    const segments = pathname.split('/');
    const id = segments[segments.length - 1];

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required in the URL' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, definition } = body;

    if (!title || !definition) {
      return NextResponse.json(
        { error: 'Title and definition are required' },
        { status: 400 }
      );
    }

    // Vérifiez si le terme existe
    const existingTerm = await prisma.glossary.findUnique({ where: { id } });

    if (!existingTerm) {
      return NextResponse.json(
        { error: 'Glossary item not found' },
        { status: 404 }
      );
    }

    const updatedGlossaryItem = await prisma.glossary.update({
      where: { id },
      data: {
        title,
        definition,
      },
    });

    return NextResponse.json({ updatedGlossaryItem });
  } catch (error) {
    return NextResponse.json(
      { error: ERROR_MESSAGES_EN.ERROR_UPDATING_GLOSSARY },
      { status: 500 }
    );
  }
}
