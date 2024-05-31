// Utils
import { prisma } from '@/_utils/constante.utils';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Lib Next
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { newPassword, token } = await request.json();

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    if (typeof decodedToken === 'object' && 'userId' in decodedToken) {
      const userId = decodedToken.userId;

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return NextResponse.json(
          { error: 'Utilisateur non trouvé' },
          { status: 404 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashedPassword,
        },
      });

      return NextResponse.json({
        message: 'Mot de passe réinitialisé avec succès',
      });
    } else {
      return NextResponse.json({ error: 'Token invalide' }, { status: 400 });
    }
  } catch (error) {
    console.error(
      'Erreur lors de la réinitialisation du mot de passe :',
      error
    );
    return NextResponse.json(
      { error: 'Erreur lors de la réinitialisation du mot de passe' },
      { status: 500 }
    );
  }
}
