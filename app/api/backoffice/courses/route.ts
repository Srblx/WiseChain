import { prisma } from "@/utils/constante.utils";
import { ERROR_MESSAGES } from "@/utils/messages.utils";
import { NextResponse } from "next/server";
import { verifyToken } from "../users/route";

export async function GET(request: Request) {
    try {
        const tokenResult = verifyToken(request);
        if ('error' in tokenResult) {
            return NextResponse.json(
              { error: tokenResult.error },
              { status: tokenResult.status }
            );
          }
      
     const course = await prisma.course.findMany({
        include: {
          sequences: true,
          category: {
            select: {
              name: true,
            },
          },
        },
        // take: 5,
        orderBy: {
          created_at: 'asc',
        },
      });

      return NextResponse.json({ course });
    } catch (error) {
      console.error(ERROR_MESSAGES.ERROR_FETCHING_COURSE, error);
      return NextResponse.json(
        { error: ERROR_MESSAGES.ERROR_FETCHING_COURSE },
        { status: 500 }
      );
    }
  }

  export async function DELETE(request: Request) {
    try {
        const tokenResult = verifyToken(request);
        if ('error' in tokenResult) {
            return NextResponse.json(
              { error: tokenResult.error },
              { status: tokenResult.status }
            );
        }

        const { searchParams } = new URL(request.url);
        const courseId = searchParams.get('id');

        if (!courseId) {
            return NextResponse.json(
              { error: ERROR_MESSAGES.MISSING_COURSE_ID },
              { status: 400 }
            );
        }

        const deletedCourse = await prisma.course.delete({
            where: {
                id: courseId,
            },
        });

        return NextResponse.json({ deletedCourse });
    } catch (error) {
        console.error(ERROR_MESSAGES.ERROR_DELETING_COURSE, error);
        return NextResponse.json(
          { error: ERROR_MESSAGES.ERROR_DELETING_COURSE },
          { status: 500 }
        );
    }
}
