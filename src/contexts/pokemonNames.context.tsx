import { createContext, useContext, useState } from "react";

type ContextType = [] | string[]

interface PokemonNamesContextType {
  pokemonList: ContextType;
  setPokemonList: React.Dispatch<React.SetStateAction<ContextType>>;
}

const PokemonNamesContext = createContext<PokemonNamesContextType | undefined>(undefined);

export const PokemonNamesProvider = ({ children }: { children: React.ReactNode }) => {
  const [pokemonList, setPokemonList] = useState<ContextType>([]);

  return (
    <PokemonNamesContext.Provider value={{ pokemonList, setPokemonList }}>
      {children}
    </PokemonNamesContext.Provider>
  );
};

export const usePokemonNamesContext = () => {
  const context = useContext(PokemonNamesContext);
  if (!context) {
    throw new Error("usePokemonNamesContext must be used within a PokemonNamesProvider");
  }
  return context;
};
