// React Libs
import { ERROR_MESSAGES_EN } from '@/utils/messages.utils';
import { createContext, ReactNode, useContext, useState } from 'react';

const FooterContext = createContext<{ showFooter: boolean; setShowFooter: (show: boolean) => void } | undefined>(undefined);

export const FooterProvider = ({ children }: { children: ReactNode }) => {
  const [showFooter, setShowFooter] = useState(true);
  return (
    <FooterContext.Provider value={{ showFooter, setShowFooter }}>
      {children}
    </FooterContext.Provider>
  );
};

export const useFooter = () => {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error(ERROR_MESSAGES_EN.MUST_BE_USED_FOOTER_PROVIDER);
  }
  return context;
};