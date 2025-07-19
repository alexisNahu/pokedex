import { PokedexFilters } from "@models";
import { createContext, useContext, useState } from "react";


interface PokedexContextType {
  pokedexList: string[] | []
  setPokedexList: React.Dispatch<React.SetStateAction<string[] | []>>
  filters: PokedexFilters
  setFilters: React.Dispatch<React.SetStateAction<PokedexFilters>>
}

const PokedexContext = createContext<PokedexContextType | undefined>(undefined);

export const PokedexProvider = ({ children }: { children: React.ReactNode }) => {
  const [pokedexList, setPokedexList] = useState<string[] | []>([])
  const [filters, setFilters] = useState<PokedexFilters>({
    generationFilter: [],
    typesFilter: [null, null],
    abilitiesFilter: []
  })

  return (
    <PokedexContext.Provider value={{ pokedexList, setPokedexList, filters, setFilters }}>
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
