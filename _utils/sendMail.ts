// import { ValidateRegistration } from "@/interfaces/auth/auth.interface";
// import nodemailer from 'nodemailer';

// export const sendEmail = async (formData: ValidateRegistration) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.REACT_APP_SMTP_USER,
//       pass: process.env.REACT_APP_SMTP_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.REACT_APP_SMTP_USER,
//     to: formData.mail,
//     subject: formData.subject,
//     html: `
//       <h1>Vérification d'inscription</h1>
//       <p>Bonjour ${formData.name},</p>
//       <p>${formData.message}</p>
//     `,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ' + info.response);
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// };
