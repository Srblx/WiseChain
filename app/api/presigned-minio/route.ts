// Utils
import { ERROR_MESSAGES_EN } from '@/utils/messages.utils';
import { getPresignedUrl } from '@/utils/minio.utils';

// Next Libs
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json(
      { error: ERROR_MESSAGES_EN.INVALID_KEY },
      { status: 400 }
    );
  }

  try {
    if (key.startsWith('http')) {
      return NextResponse.json({ url: key });
    }

    const url = await getPresignedUrl(key);
    return NextResponse.json({ url });
  } catch (error) {
    console.error(ERROR_MESSAGES_EN.ERROR_GENERATING_PRESIGNED_URL, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES_EN.FAILED_GENERATE_PRESIGNED_URL },
      { status: 500 }
    );
  }
}
