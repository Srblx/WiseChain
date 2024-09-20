// Helpers
import * as Yup from 'yup';

// Utils
import { ERROR_MESSAGES_YUP_FR } from '@/utils/messages.utils';

export const UserFormSchemaBackoffice = Yup.object().shape({
  firstname: Yup.string()
    .min(3, ERROR_MESSAGES_YUP_FR.FIRSTNAME_MUST_HAVE)
    .max(50, ERROR_MESSAGES_YUP_FR.FIRSTNAME_MUST_HAVE)
    .required(ERROR_MESSAGES_YUP_FR.FIRSNAME_REQUIRED),
  lastname: Yup.string()
    .min(3, ERROR_MESSAGES_YUP_FR.LASTNAME_MUST_HAVE)
    .max(80, ERROR_MESSAGES_YUP_FR.LASTNAME_MUST_HAVE)
    .required(ERROR_MESSAGES_YUP_FR.LASTNAME_REQUIRED),
  pseudo: Yup.string()
    .min(3, ERROR_MESSAGES_YUP_FR.PSEUDO_MUST_HAVE)
    .required(ERROR_MESSAGES_YUP_FR.PSEUDO_REQUIRED),
  mail: Yup.string()
    .email(ERROR_MESSAGES_YUP_FR.MAIL_NOT_VALID)
    .required(ERROR_MESSAGES_YUP_FR.MAIL_REQUIRED),
  password: Yup.string()
    .when('userToEdit', (userToEdit, schema) => {
      if (!userToEdit) {
        return schema
          .min(12, ERROR_MESSAGES_YUP_FR.PASSWORD_MUST_HAVE_LENGHT_MIN)
          .required(ERROR_MESSAGES_YUP_FR.PASSWORD_REQUIRED);
      }
      return schema.notRequired();
    })
    .required(ERROR_MESSAGES_YUP_FR.PASSWORD_REQUIRED),
  dateOfBirth: Yup.date()
    .transform((value, originalValue) => {
      if (originalValue === '') {
        return null;
      }
      return new Date(originalValue);
    })
    .nullable()
    .required(ERROR_MESSAGES_YUP_FR.DATEOFBIRTH_REQUIRED)
    .test('age', ERROR_MESSAGES_YUP_FR.DATEOFBIRTH_AGE, function (value) {
      if (!value) return false;
      const currentDate = new Date();
      const birthDate = new Date(value);
      let age = currentDate.getFullYear() - birthDate.getFullYear();
      const month = currentDate.getMonth() - birthDate.getMonth();
      if (
        month < 0 ||
        (month === 0 && currentDate.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age >= 10 && age <= 100;
    }),
  country: Yup.string().required(ERROR_MESSAGES_YUP_FR.COUNTRY_REQUIRED),
});
