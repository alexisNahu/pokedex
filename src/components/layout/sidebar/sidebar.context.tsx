import { createContext, useContext, useState } from "react";

interface SidebarContextType {
  activo: boolean;
  setActivo: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [activo, setActivo] = useState<boolean>(true);

  return (
    <SidebarContext.Provider value = {{activo, setActivo}}>
        {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within an AppProvider");
  }
  return context;
};
