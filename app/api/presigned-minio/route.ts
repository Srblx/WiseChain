import { getPresignedUrl } from '@/utils/minio.utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json({ error: 'Invalid key parameter' }, { status: 400 });
  }

  try {
    if (key.startsWith('http')) {
      return NextResponse.json({ url: key });
    }

    const url = await getPresignedUrl(key);
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json({ error: 'Failed to generate presigned URL' }, { status: 500 });
  }
}