import {
  PokemonSpeciesDAO,
  PokemonDAO,
  PokemonChainEvolutionDAO,
  AbilityDAO,
  TypeDAO,
  AllAbilitiesDAO
} from '@models/dao/index'

import * as pokemonApi from '../api/pokeapi.api.ts'
import { PokemonType } from '@models/pokemonTypes.model.ts'

export const getPokemonByNameOrId = async (param: string | number, signal?: AbortSignal): Promise<PokemonDAO> =>
  await pokemonApi.fetchPokemonByIdOrName(param, signal)

export const getPokemonSpecies = async (name: string, signal?: AbortSignal): Promise<PokemonSpeciesDAO> =>
  await pokemonApi.fetchPokemonSpecies(name, signal)

export const getPokemonChainEvolution = async (pokemonChainUrl: string, signal?: AbortSignal): Promise<PokemonChainEvolutionDAO> =>
  await pokemonApi.fetchPokemonChanEvolution(pokemonChainUrl, signal)

export const getPokemonAbility = async (abilityName: string, signal?: AbortSignal): Promise<AbilityDAO> =>
  await pokemonApi.fetchPokemonAbility(abilityName, signal)

export const getAllPokemonAbilities = async (signal?: AbortSignal): Promise<AllAbilitiesDAO> =>
  await pokemonApi.fetchAllAbilities(signal)

export const getPokemonWeaknesses = async (pokemonTypeUrl: string, signal?: AbortSignal): Promise<TypeDAO> =>
  await pokemonApi.fetchPokemonTypeWeaknesses(pokemonTypeUrl, signal)

export const getPokemonGeneration = async (generation: string, signal?: AbortSignal) =>
  await pokemonApi.fetchGeneration(generation, signal)

export const getPokemonNamesList = async (signal?: AbortSignal) =>
  await pokemonApi.fetchPokemonNames(signal)

export const getPokemonType = async (type: PokemonType, signal?: AbortSignal): Promise<TypeDAO> =>
  await pokemonApi.fetchPokemonsByType(type, signal)
