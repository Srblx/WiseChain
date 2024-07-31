// Helpers
import axios from 'axios';

// Enums
import Routes from '@/enums/routes.enum';

export const getTokenFromLocalStorage = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const setTokenInLocalStorage = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const removeTokenFromLocalStorage = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

export const fetchUserFromToken = async (token: string) => {
  try {
    const response = await axios.get(Routes.SIGNIN, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};
