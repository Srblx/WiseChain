// Interfaces
import { UserFormData } from '@/interfaces/auth/auth.interface';

// React libs
import { useState } from 'react';

// Helpers
import * as Yup from 'yup';

export const useUserForm = (
  initialState: UserFormData,
  validationSchema?: Yup.Schema<UserFormData>
) => {
  const [formData, setFormData] = useState<UserFormData>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const resetForm = () => setFormData(initialState);

  const validate = async () => {
    if (!validationSchema) return;

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const formErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            formErrors[error.path] = error.message;
          }
        });
        setErrors(formErrors);
      }
    }
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    resetForm,
    errors,
    validate,
  };
};
