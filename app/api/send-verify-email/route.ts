// Lib
import { compilerMailTemplate, sendMail } from '@/lib/mail';
import { ERROR_MESSAGES_EN, SUCCESS_MESSAGES_EN } from '@/utils/messages.utils';

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

      res.status(200).json({ message: SUCCESS_MESSAGES_EN.MAIL_SEND });
    } catch (error) {
      console.error(ERROR_MESSAGES_EN.ERROR_SENDING_MAIL, error);
      res.status(500).json({ error: ERROR_MESSAGES_EN.ERROR_SENDING_MAIL });
    }
  } else {
    res.status(405).json({ error: ERROR_MESSAGES_EN.METHOD_NOT_ALLOWED });
  }
}
