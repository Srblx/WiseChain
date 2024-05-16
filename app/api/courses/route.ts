import { NextResponse } from 'next/server';

export const POST = async () => {
  return NextResponse.json({
    data: [
    { 
        id: 1,
        name: 'Course 1' 
    },
    { 
        id: 2,
        name: 'Course 2' 
    },
    { 
        id: 3, 
        name: 'Course 3'
    },
    ],
  });
};
