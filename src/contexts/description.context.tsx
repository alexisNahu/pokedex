import { createContext, useContext, useState } from "react";
import { PokemonDTO, VariantPokemonDTO } from "@models/pokemon.model";

type ContextType = null | VariantPokemonDTO | PokemonDTO

interface DescriptionContextType {
  poke: ContextType;
  setPokemon: React.Dispatch<React.SetStateAction<ContextType>>;
}

const DescriptionContext = createContext<DescriptionContextType | undefined>(undefined);

export const DescriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [poke, setPokemon] = useState<ContextType>(null);

  return (
    <DescriptionContext.Provider value={{ poke, setPokemon }}>
      {children}
    </DescriptionContext.Provider>
  );
};

export const useDescriptionContext = () => {
  const context = useContext(DescriptionContext);
  if (!context) {
    throw new Error("useDescriptionContext must be used within a DescriptionProvider");
  }
  return context;
};
