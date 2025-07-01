import { createContext, useContext, useState } from "react";

type ContextType = number;

interface PokedexContextType {
  currentPage: ContextType;
  setCurrentPage: React.Dispatch<React.SetStateAction<ContextType>>;
  pokedexList: string[] | []
  setPokedexList: React.Dispatch<React.SetStateAction<string[] | []>>
}

const PokedexContext = createContext<PokedexContextType | undefined>(undefined);

export const PokedexProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<ContextType>(1);
  const [pokedexList, setPokedexList] = useState<string[] | []>([])

  return (
    <PokedexContext.Provider value={{ currentPage, setCurrentPage, pokedexList, setPokedexList }}>
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
