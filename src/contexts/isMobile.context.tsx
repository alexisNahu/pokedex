import { useState, useContext, createContext, useEffect } from "react";

type ContextType = boolean

interface MobileContextType {
  isMobile: ContextType;
  setIsMobile: React.Dispatch<React.SetStateAction<ContextType>>;
}

const MobileContext = createContext<MobileContextType | undefined>(undefined);

export const MobileProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState<ContextType>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <MobileContext.Provider value={{ isMobile, setIsMobile }}>
      {children}
    </MobileContext.Provider>
  );
};

export const useMobileContext = () => {
  const context = useContext(MobileContext);
  if (!context) {
    throw new Error("useMobileContext must be used within a MobileProvider");
  }
  return context;
};
