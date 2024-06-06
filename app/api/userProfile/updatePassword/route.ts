// Utils 
import { prisma } from '@/_utils/constante.utils';

// Helpers
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Lib Next
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { oldPassword, newPassword, confirmPassword } = await request.json();

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

    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isOldPasswordCorrect) {
      return NextResponse.json({ error: 'Ancien mot de passe incorrect' }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: 'Le nouveau mot de passe et sa confirmation ne correspondent pas' }, { status: 400 });
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

    return NextResponse.json({ message: 'Mot de passe modifié avec succès' });
  } catch (error) {
    console.error('Erreur lors de la modification du mot de passe :', error);
    return NextResponse.json({ error: 'Erreur lors de la modification du mot de passe' }, { status: 500 });
  }
}