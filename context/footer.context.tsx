// React Libs
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
    throw new Error('useFooter must be used within a FooterProvider');
  }
  return context;
};