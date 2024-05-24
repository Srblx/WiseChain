// pages/api/send-email.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Créez un transporteur SMTP
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.REACT_APP_SMTP_USER,
        pass: process.env.REACT_APP_SMTP_PASSWORD,
      },
    });

    try {
      // Envoyez l'email
      await transporter.sendMail({
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Nouveau message de ${name}`,
        text: message,
        html: `<p>${message}</p>`,
      });

      res.status(200).json({ message: 'Email envoyé avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de l'envoi de l'email" });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
