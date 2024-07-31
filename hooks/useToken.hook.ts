// Utils
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
  setTokenInLocalStorage,
} from '@/utils/auth/auth.utils';

// Lib React
import { useEffect, useState } from 'react';

const useToken = () => {
  const [token, setToken] = useState<string | null>(getTokenFromLocalStorage());

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = getTokenFromLocalStorage();
      setToken(newToken);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const saveToken = (newToken: string) => {
    setTokenInLocalStorage(newToken);
    setToken(newToken);
    window.dispatchEvent(new Event('storage'));
  };

  const clearToken = () => {
    removeTokenFromLocalStorage();
    setToken(null);
    window.dispatchEvent(new Event('storage'));
  };

  return { token, saveToken, clearToken };
};

export default useToken;
