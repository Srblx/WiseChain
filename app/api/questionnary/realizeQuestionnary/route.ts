// utils
import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from "@/utils/constante.utils";
import { ERROR_MESSAGES_EN } from '@/utils/messages.utils';

// Next Libs
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const tokenResult = verifyAndDecodeToken(request);

    if (tokenResult instanceof NextResponse) {
        return tokenResult;
    }

    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const questionaryId = url.searchParams.get('questionaryId');

    if (!userId || !questionaryId) {
        return NextResponse.json({ error: ERROR_MESSAGES_EN.MISSING_USER_ID_OR_QUESTIONARY_ID }, { status: 400 });
    }

    try {
        const existingRecord = await prisma.realizeQuestionary.findFirst({
            where: {
                user_id: userId,
                questionary_id: questionaryId,
            },
        });

        return NextResponse.json({ exists: !!existingRecord });
    } catch (error) {
        console.error(ERROR_MESSAGES_EN.INTERNAL_SERVER_ERROR, error);
        return NextResponse.json({ error: ERROR_MESSAGES_EN.INTERNAL_SERVER_ERROR }, { status: 500 });
    }
}