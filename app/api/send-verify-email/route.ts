// Lib
import { compilerMailTemplate, sendMail } from '@/lib/mail';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/messages.utils';

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

      res.status(200).json({ message: SUCCESS_MESSAGES.MAIL_SEND });
    } catch (error) {
      console.error(ERROR_MESSAGES.ERROR_SENDING_MAIL, error);
      res.status(500).json({ error: ERROR_MESSAGES.ERROR_SENDING_MAIL });
    }
  } else {
    res.status(405).json({ error: ERROR_MESSAGES.METHOD_NOT_ALLOWED });
  }
}
