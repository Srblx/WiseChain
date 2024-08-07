// Interfaces
import { UserFormData } from '@/interfaces/auth/auth.interface';

// React libs
import { useState } from 'react';

export const useUserForm = (initialState: UserFormData) => {
  const [formData, setFormData] = useState<UserFormData>(initialState);

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

  return { formData, handleInputChange, resetForm };
};
