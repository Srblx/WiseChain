// Utils 
import { prisma } from '@/_utils/constante.utils';

// Helpers
import jwt from 'jsonwebtoken';

// Lib Next
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const { firstname, lastname, pseudo } = await request.json();

  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 });
    }
    
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
      if (typeof decodedToken === 'string' || !decodedToken.userId) {
        return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
      }
    } catch (error) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }

    const userId = decodedToken.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstname,
        lastname,
        pseudo,
      },
    });

    return NextResponse.json({ message: 'Profil utilisateur modifié avec succès', user: updatedUser });
  } catch (error) {
    console.error('Erreur lors de la modification du profil utilisateur :', error);
    return NextResponse.json({ error: 'Erreur lors de la modification du profil utilisateur' }, { status: 500 });
  }
}