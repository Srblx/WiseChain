import { uploadFiles } from '@/utils/minio.utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    let data;
    const contentType = req.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      data = await req.json();
    } else if (contentType?.includes('multipart/form-data')) {
      const formData = await req.formData();
      data = Object.fromEntries(formData);
    } else {
      return NextResponse.json(
        { error: 'Unsupported content type' },
        { status: 415 }
      );
    }

    const { filename, mimetype, file } = data;
console.log('data:', data);
    if (!filename || !mimetype || !file) {
      return NextResponse.json(
        { error: 'Filename, mimetype, and file are required' },
        { status: 400 }
      );
    }

    let fileBuffer;
    if (typeof file === 'string') {
      fileBuffer = Buffer.from(file, 'base64');
    } else if (file instanceof Blob) {
      fileBuffer = Buffer.from(await file.arrayBuffer());
    } else {
      return NextResponse.json(
        { error: 'Invalid file format' },
        { status: 400 }
      );
    }

    const key = `uploads/${Date.now()}-${filename}`;

    const result = await uploadFiles(
      key,
      fileBuffer,
      mimetype,
      fileBuffer.length
    );

    if (result.success) {
      return NextResponse.json(
        { message: result.message, key },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in upload handler:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
