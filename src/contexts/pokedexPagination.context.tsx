import { createContext, useContext, useState } from "react";
import { usePokedexContext } from "./pokedex.context";

type PageNumber = number;



interface PokedexPaginationContextType {
  currentPage: PageNumber;
  setCurrentPage: React.Dispatch<React.SetStateAction<PageNumber>>;
  lastPage: PageNumber;
  setLastPage: React.Dispatch<React.SetStateAction<PageNumber>>;
}

const PokedexPaginationContext = createContext<PokedexPaginationContextType | undefined>(undefined);

export const PokedexPaginationProvider = ({ children }: { children: React.ReactNode }) => {
  const {pokedexList} = usePokedexContext()
  const itemsPerPage: number = 10
  
  const [currentPage, setCurrentPage] = useState<PageNumber>(1);
  const [lastPage, setLastPage] = useState<PageNumber>(Math.ceil(pokedexList.length / itemsPerPage));

  return (
    <PokedexPaginationContext.Provider value={{ currentPage, setCurrentPage, lastPage, setLastPage }}>
      {children}
    </PokedexPaginationContext.Provider>
  );
};

export const usePokedexPaginationContext = () => {
  const context = useContext(PokedexPaginationContext);
  if (!context) {
    throw new Error("usePokedexPaginationContext must be used within a PokedexPaginationProvider");
  }
  return context;
};
