import { prisma } from "@/utils/constante.utils";
import { ERROR_MESSAGES } from "@/utils/messages.utils";
import { NextResponse } from "next/server";
import { verifyToken } from "../../users/route";

export async function PUT(request: Request){
    try {
        const tokenResult = verifyToken(request);
        if ('error' in tokenResult) {
            return NextResponse.json(
              { error: tokenResult.error },
              { status: tokenResult.status }
            );
        }

        const url = new URL(request.url);
        const courseId = url.pathname.split('/').pop();

        if (!courseId) {
            return NextResponse.json(
              { error: ERROR_MESSAGES.MISSING_COURSE_ID },
              { status: 400 }
            );
        }

        const body = await request.json();
        const {
          main_title,
          description,
          content,
          img,
          category,
          difficulty,
        } = body;

        const updateCourse = await prisma.course.update({
            where: { id: courseId },
            data: {
                main_title,
                description,
                content,
                img,
                category,
                difficulty,
            },
        });
        return NextResponse.json({ updateCourse });
    } catch (error) {
        console.error(ERROR_MESSAGES.ERROR_UPDATE_COURSE, error);
        return NextResponse.json(
          { error: ERROR_MESSAGES.ERROR_UPDATE_COURSE },
          { status: 500 }
        );
        
    }
}