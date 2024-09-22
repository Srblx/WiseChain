// Utils 
import { verifyAndDecodeToken } from '@/utils/auth/decodedToken.utils';
import { prisma } from '@/utils/constante.utils';
import { uploadFiles } from '@/utils/minio.utils';

// Helpers

// Lib Next
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const decodedTokenOrError = verifyAndDecodeToken(req);
    if (decodedTokenOrError instanceof NextResponse) {
      return decodedTokenOrError;
    }

    const userId = decodedTokenOrError.userId;

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const filename = formData.get('filename') as string;
    const mimetype = formData.get('mimetype') as string;

    if (!file || !filename || !mimetype) {
      return NextResponse.json(
        { error: 'Fichier, nom de fichier et type MIME sont requis' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const key = `${userId}/profile-picture`;

    const result = await uploadFiles(key, buffer, mimetype, buffer.length);

    if (result.success) {
      await prisma.user.update({
        where: { id: userId },
        data: { profile_img: key },
      });

      return NextResponse.json(
        { 
          message: 'Image de profil mise à jour avec succès',
          imageKey: key 
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Erreur lors du traitement de l\'upload:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}