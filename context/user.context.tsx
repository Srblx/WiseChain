'use client';
// Interfaces
import { User } from '@/interfaces/auth/auth.interface';
import { ERROR_MESSAGES_EN } from '@/utils/messages.utils';

// Lib React
import { ReactNode, createContext, useContext, useState } from 'react';

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(ERROR_MESSAGES_EN.MUST_BE_USED_USER_PROVIDER);
  }
  return context;
};
