// Lib React
import { useEffect, useState } from 'react';

// Interfaces
import { User } from '@/interfaces/auth/auth.interface';

function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    setToken(storedToken !== null ? storedToken : null);
    setUser(storedUser !== null ? JSON.parse(storedUser) : null);
  }, []);

  const login = (newUser: User, newToken: string) => {
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('token', newToken);
    setUser(newUser);
    setToken(newToken);
    window.dispatchEvent(new Event('storage'));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
