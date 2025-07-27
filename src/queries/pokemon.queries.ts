import { getPokemonNames } from "@services/pokemonNames.service";
import * as pokemonService from "@services/pokemon.service";
import * as pokeapiService from "@services/pokeapi.service";
import { PokedexFilters } from "@models/pokemon.model";
import { PokemonType } from "@models/pokemonTypes.model";

interface filterPokemonDTO {
  filters: PokedexFilters;
  pokemonList: Set<string>;
  signal?: AbortSignal;
}

export const pokemonDTOQueries = {
  getAllNames: () => ({
    queryKey: ["pokemonNames"],
    queryFn: async () => await getPokemonNames(),
  }),
  getPokemon: (nameOrId: string, signal?: AbortSignal) => ({
    queryKey: ["pokemonDTO"],
    queryFn: async () =>
      await pokemonService.getPokemonDTOByNameOrId(nameOrId, signal),
  }),
  filterPokemon: ({ filters, pokemonList, signal }: filterPokemonDTO) => ({
    queryKey: ["pokemonFilter"],
    queryFn: async () =>
      await pokemonService.filterPokemonList(filters, pokemonList, signal),
  }),
  getPokemonSpecies: (name: string, signal?: AbortSignal) => ({
    queryKey: ["pokemonSpecies", name],
    queryFn: async () => await pokeapiService.getPokemonSpecies(name, signal),
  }),

  getPokemonChainEvolution: (
    pokemonChainUrl: string,
    signal?: AbortSignal
  ) => ({
    queryKey: ["pokemonChainEvolution", pokemonChainUrl],
    queryFn: async () =>
      await pokeapiService.getPokemonChainEvolution(pokemonChainUrl, signal),
  }),

  getPokemonAbility: (abilityName: string, signal?: AbortSignal) => ({
    queryKey: ["pokemonAbility", abilityName],
    queryFn: async () =>
      await pokeapiService.getPokemonAbility(abilityName, signal),
  }),

  getAllPokemonAbilities: (signal?: AbortSignal) => ({
    queryKey: ["allPokemonAbilities"],
    queryFn: async () => await pokeapiService.getAllPokemonAbilities(signal),
  }),

  getPokemonWeaknesses: (pokemonTypeUrl: string, signal?: AbortSignal) => ({
    queryKey: ["pokemonWeaknesses", pokemonTypeUrl],
    queryFn: async () =>
      await pokeapiService.getPokemonWeaknesses(pokemonTypeUrl, signal),
  }),

  getPokemonGeneration: (generation: string, signal?: AbortSignal) => ({
    queryKey: ["pokemonGeneration", generation],
    queryFn: async () =>
      await pokeapiService.getPokemonGeneration(generation, signal),
  }),


  getPokemonType: (type: PokemonType, signal?: AbortSignal) => ({
    queryKey: ["pokemonType", type],
    queryFn: async () => await pokeapiService.getPokemonType(type, signal),
  }),
};

