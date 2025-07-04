import { createContext, useContext, useState } from "react";


interface PokedexContextType {
  pokedexList: string[] | []
  setPokedexList: React.Dispatch<React.SetStateAction<string[] | []>>
}

const PokedexContext = createContext<PokedexContextType | undefined>(undefined);

export const PokedexProvider = ({ children }: { children: React.ReactNode }) => {
  const [pokedexList, setPokedexList] = useState<string[] | []>([])

  return (
    <PokedexContext.Provider value={{ pokedexList, setPokedexList }}>
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
