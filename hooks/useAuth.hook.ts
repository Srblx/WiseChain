'use client';

// Context
import { useUser } from '@/context/user.context';

// Interfaces
import { User } from '@/interfaces/auth/auth.interface';

// Utils
import { fetchUserFromToken } from '@/utils/auth/auth.utils';

// Hooks
import useToken from './useToken.hook';

// Libs React
import { useCallback, useEffect } from 'react';

function useAuth() {
  const { user, setUser } = useUser();
  const { token, saveToken, clearToken } = useToken();

  const fetchUser = useCallback(
    async (token: string) => {
      try {
        const user = await fetchUserFromToken(token);
        setUser(user);
      } catch (error) {
        setUser(null);
      }
    },
    [setUser]
  );

  useEffect(() => {
    if (token) {
      fetchUser(token);
    }
  }, [token, fetchUser]);

  const login = (newUser: User, newToken: string) => {
    saveToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return {
    token,
    user,
    login,
    logout,
  };
}

export default useAuth;
