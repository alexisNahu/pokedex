import { PokemonType } from "@models";
import { PokedexFilters } from "@models/pokemon.model";
import { useQuery } from "@tanstack/react-query";
import * as pokeapiService from '@services/pokeapi.service'
import * as pokemonService from '@services/pokemon.service'
import { getPokemonNames } from "@services/pokemonNames.service";

interface filterPokemonDTO {
  filters: PokedexFilters;
  pokemonList: Set<string>;
  signal?: AbortSignal;
}
export const useGetAllNames = () => 
  useQuery({
    queryKey: ["pokemonNames"],
    queryFn: async () => await getPokemonNames(),
  });

export const useGetPokemon = (nameOrId: string, signal?: AbortSignal) => 
  useQuery({
    queryKey: ["pokemonDTO", nameOrId],
    queryFn: async () =>
      await pokemonService.getPokemonDTOByNameOrId(nameOrId, signal),
  });

export const useFilterPokemon = ({ filters, pokemonList, signal }: filterPokemonDTO) => 
  useQuery({
    queryKey: ["pokemonFilter"],
    queryFn: async () =>
      await pokemonService.filterPokemonList(filters, pokemonList, signal),
  });

export const useGetPokemonSpecies = (name: string, signal?: AbortSignal) => 
  useQuery({
    queryKey: ["pokemonSpecies", name],
    queryFn: async () => await pokeapiService.getPokemonSpecies(name, signal),
  });

export const useGetPokemonChainEvolution = (pokemonChainUrl: string, signal?: AbortSignal) => 
  useQuery({
    queryKey: ["pokemonChainEvolution", pokemonChainUrl],
    queryFn: async () =>
      await pokeapiService.getPokemonChainEvolution(pokemonChainUrl, signal),
  });

export const useGetPokemonAbility = (abilityName: string, signal?: AbortSignal) => 
  useQuery({
    queryKey: ["pokemonAbility", abilityName],
    queryFn: async () =>
      await pokeapiService.getPokemonAbility(abilityName, signal),
  });

export const useGetAllPokemonAbilities = (signal?: AbortSignal) => 
  useQuery({
    queryKey: ["allPokemonAbilities"],
    queryFn: async () => await pokeapiService.getAllPokemonAbilities(signal),
  });

export const useGetPokemonWeaknesses = (pokemonTypeUrl: string, signal?: AbortSignal) => 
  useQuery({
    queryKey: ["pokemonWeaknesses", pokemonTypeUrl],
    queryFn: async () =>
      await pokeapiService.getPokemonWeaknesses(pokemonTypeUrl, signal),
  });

export const useGetPokemonGeneration = (generation: string, signal?: AbortSignal) => 
  useQuery({
    queryKey: ["pokemonGeneration", generation],
    queryFn: async () =>
      await pokeapiService.getPokemonGeneration(generation, signal),
  });

export const useGetPokemonType = (type: PokemonType, signal?: AbortSignal) => 
  useQuery({
    queryKey: ["pokemonType", type],
    queryFn: async () => await pokeapiService.getPokemonType(type, signal),
  });


// Objeto con todos los hooks (opcional)
 export const usePokemonQueries = {
  useGetAllNames,
  useGetPokemon,
  useFilterPokemon,
  useGetPokemonSpecies,
  useGetPokemonChainEvolution,
  useGetPokemonAbility,
  useGetAllPokemonAbilities,
  useGetPokemonWeaknesses,
  useGetPokemonGeneration,
  useGetPokemonType
};