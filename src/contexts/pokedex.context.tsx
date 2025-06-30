import { createContext, useContext, useState } from "react";

type ContextType = number;

interface PokedexContextType {
  currentPage: ContextType;
  setCurrentPage: React.Dispatch<React.SetStateAction<ContextType>>;
}

const PokedexContext = createContext<PokedexContextType | undefined>(undefined);

export const PokedexProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<ContextType>(1);

  return (
    <PokedexContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PokedexContext.Provider>
  );
};

export const usePokedexContext = () => {
  const context = useContext(PokedexContext);
  if (!context) {
    throw new Error("usePokedexContext must be used within a PokedexProvider");
  }
  return context;
};
