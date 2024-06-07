import { ERROR_MESSAGES_YUP } from '@/utils/messages.utils';
import { notifyError, notifySucces } from '@/utils/sonnerToast.utils';
import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  mail: Yup.string()
    .email(ERROR_MESSAGES_YUP.MAIL_NOT_VALID)
    .required(ERROR_MESSAGES_YUP.MAIL_REQUIRED),
  password: Yup.string().required(ERROR_MESSAGES_YUP.PASSWORD_REQUIRED),
});

export const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, ERROR_MESSAGES_YUP.FIRSTNAME_MUST_HAVE)
    .max(50, ERROR_MESSAGES_YUP.FIRSTNAME_MUST_HAVE)
    .required(ERROR_MESSAGES_YUP.FIRSNAME_REQUIRED),
  lastname: Yup.string()
    .min(3, ERROR_MESSAGES_YUP.LASTNAME_MUST_HAVE)
    .max(80, ERROR_MESSAGES_YUP.LASTNAME_MUST_HAVE)
    .required(ERROR_MESSAGES_YUP.LASTNAME_REQUIRED),
  pseudo: Yup.string()
    .min(3, ERROR_MESSAGES_YUP.PSEUDO_MUST_HAVE)
    .required(ERROR_MESSAGES_YUP.PSEUDO_REQUIRED),
  mail: Yup.string()
    .email(ERROR_MESSAGES_YUP.MAIL_NOT_VALID)
    .required(ERROR_MESSAGES_YUP.MAIL_REQUIRED),
  password: Yup.string()
    .min(12, ERROR_MESSAGES_YUP.PASSWORD_MUST_HAVE_LENGHT_MIN)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,
      ERROR_MESSAGES_YUP.PASSWORD_MUST_HAVE
    )
    .required(ERROR_MESSAGES_YUP.PASSWORD_REQUIRED),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], ERROR_MESSAGES_YUP.PASSWORD_NOT_MATCH)
    .required(ERROR_MESSAGES_YUP.PASSWORD_CONFIRMATION_REQUIRED),
  dateOfBirth: Yup.date()
    .transform((value, originalValue) => {
      if (originalValue === '') {
        return null;
      }
      return value;
    })
    .nullable()
    .required(ERROR_MESSAGES_YUP.DATEOFBIRTH_REQUIRED)
    .test('age', ERROR_MESSAGES_YUP.DATEOFBIRTH_AGE, function (value) {
      const currentDate = new Date();
      const birthDate = new Date(value);
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      return age >= 10 && age <= 100;
    }),
  country: Yup.string().required(ERROR_MESSAGES_YUP.COUNTRY_REQUIRED),
  isTermsAccepted: Yup.boolean()
    .oneOf([true], ERROR_MESSAGES_YUP.IS_TERMS_ACCEPTED)
    .required(ERROR_MESSAGES_YUP.IS_TERMS_ACCEPTED),
});

export const notifyForgotPassword = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    notifyError(ERROR_MESSAGES_YUP.FORMAT_MAIL_INVALID);
    return;
  }

  notifySucces(ERROR_MESSAGES_YUP.SEND_MAIL);
};

export const passwordResetSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(12, ERROR_MESSAGES_YUP.PASSWORD_MUST_HAVE_LENGHT_MIN)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,
      ERROR_MESSAGES_YUP.PASSWORD_MUST_HAVE
    )
    .required(ERROR_MESSAGES_YUP.PASSWORD_REQUIRED),
  confirmNewPassword: Yup.string()
    .nullable()
    .oneOf([Yup.ref('newPassword')], ERROR_MESSAGES_YUP.PASSWORD_NOT_MATCH)
    .required(ERROR_MESSAGES_YUP.PASSWORD_CONFIRMATION_REQUIRED),
});
