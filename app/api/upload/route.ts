// Utils
import { ERROR_MESSAGES_EN } from '@/utils/messages.utils';
import { uploadFiles } from '@/utils/minio.utils';

// Next Libs
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

    if (!filename || !mimetype || !file) {
      return NextResponse.json(
        { error: ERROR_MESSAGES_EN.FILENAME_MIMETYPE_FILE_REQUIRED},
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
        { error: ERROR_MESSAGES_EN.INVALID_FILE_FORMAT },
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
    console.error(ERROR_MESSAGES_EN.ERROR_UPLOAD_HANDLER, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES_EN.INTERNAL_SERVER_ERROR },
      { status: 500 }
    );
  }
}
