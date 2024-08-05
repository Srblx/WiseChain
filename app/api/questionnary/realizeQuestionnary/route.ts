// utils
import { prisma } from "@/utils/constante.utils";

// Helpers
import jwt from 'jsonwebtoken';

// Next Libs
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const questionaryId = url.searchParams.get('questionaryId');
  
    if (!userId || !questionaryId) {
      return NextResponse.json({ error: 'Missing userId or questionaryId' }, { status: 400 });
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
        where: {
          user_id: userId,
          questionary_id: questionaryId,
        },
      });
  
      return NextResponse.json({ exists: !!existingRecord });
    } catch (error) {
      console.error('Internal server error', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
  