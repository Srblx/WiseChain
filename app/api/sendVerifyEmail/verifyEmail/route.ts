import { prisma } from '@/_utils/constante.utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function PATH(req: NextApiRequest, res: NextApiResponse) {
  //   if (req.method === 'POST') {
  try {
    const { email } = req.body;

    await prisma.user.update({
      where: { mail: email },
      data: { is_verified: true },
    });

    res.status(200).json({ message: 'Email vérifié avec succès' });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la vérification de l'email" });
  }
  //   } else {
  // res.status(405).json({ error: 'Méthode non autorisée' });
  //   }
}
