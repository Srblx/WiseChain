'use server';

// Interfaces
import { Mail } from '@/interfaces/mail/mail.interface';

// NodeMailer
import nodemailer from 'nodemailer';

// Mail Template
import * as handlebars from 'handlebars';
import { resetPasswordTemplate } from './templates/resetPassword';
import { verifyMailTemplate } from './templates/verifyMail';

export async function sendMail({ to, name, subject, body }: Mail) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    await transport.verify();
  } catch (error) {
    console.log('error : ', error);
    return;
  }

  try {
    await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
  } catch (error) {
    console.log('error : ', error);
  }
}

export async function compilerResetPasswordTemplate(url: string) {
  const template = handlebars.compile(resetPasswordTemplate);
  const htmlBody = template({
    url: url,
  });
  return htmlBody;
}

export async function compilerMailTemplate(url: string) {
  const template = handlebars.compile(verifyMailTemplate);
  const htmlBody = template({
    url: url,
  });
  return htmlBody;
}
