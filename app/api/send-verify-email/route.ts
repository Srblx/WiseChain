
// Lib
import { compilerMailTemplate, sendMail } from '@/lib/mail';

// Lib Next
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, name } = req.body;

    try {
      const verificationUrl = `${process.env.WEBSITE_URL}/verify-email?email=${email}`;
      const emailBody = await compilerMailTemplate(verificationUrl);

      await sendMail({
        to: email, 
        name,
        subject: 'Vérification de votre email',
        body: emailBody,
      });

      res.status(200).json({ message: 'Email de vérification envoyé' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de vérification :', error);
      res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email de vérification' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}