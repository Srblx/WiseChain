"use server";

// Interfaces
import { Mail } from '@/interfaces/mail/mail.interface';

// NodeMailer
import nodemailer from 'nodemailer';

// Mail Template
import * as handlebars from 'handlebars';
import { resetPasswordTemplate } from './template/resetPassword';

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
    const testResult = await transport.verify();
    console.log('testResult : ', testResult);
  } catch (error) {
    console.log('error : ', error);
    return;
  }

  try {
    const sendMailInfo = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log('sendMail : ', sendMailInfo);
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
