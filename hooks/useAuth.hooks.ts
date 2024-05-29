import { useEffect, useState } from 'react';

//? function useAuth() {
//?   const [token, setToken] = useState<string | null>(() => {
//?     const storedToken = localStorage.getItem('token');
//?     return storedToken !== null ? storedToken : null;
//?   });

//?   const login = (newToken: string) => {
//?     localStorage.setItem('token', newToken);
//?     setToken(newToken);
//?   };

// ?  const logout = () => {
// ?    localStorage.removeItem('token');
// ?    setToken(null);
// ?  };

//?   return {
//?     token,
//?     login,
//?     logout,
//?   };
//? }

//? export default useAuth;


function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken !== null ? storedToken : null);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    window.dispatchEvent(new Event('storage'));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.dispatchEvent(new Event('storage'));
  };

  return {
    token,
    login,
    logout,
  };
}

export default useAuth;