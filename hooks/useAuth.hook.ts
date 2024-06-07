// hooks/useAuth.hook.ts
"use client";

import { useUser } from '@/context/user.context';
import Routes from '@/enums/routes.enum';
import { User } from '@/interfaces/auth/auth.interface';
import axios from 'axios';
import { useEffect, useState } from 'react';

function useAuth() {
  const { user, setUser } = useUser();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    }

    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      if (newToken) {
        setToken(newToken);
        fetchUser(newToken);
      } else {
        setToken(null);
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const response = await axios.get(Routes.SIGNIN, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
    }
  };

  const login = (newUser: User, newToken: string) => {
    localStorage.setItem('token', newToken);
    setUser(newUser);
    setToken(newToken);
    window.dispatchEvent(new Event('storage'));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    window.dispatchEvent(new Event('storage'));
  };

  return {
    token,
    user,
    login,
    logout,
  };
}

export default useAuth;
