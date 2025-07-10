import {
  PokemonSpeciesDAO,
  PokemonDAO,
  PokemonChainEvolutionDAO,
  AbilityDAO,
  TypeDAO,
  AllAbilitiesDAO
} from '@models/dao'

import * as pokemonApi from '../api/pokeapi.api.ts'
import { PokemonType } from '@models/pokemonTypes.model.ts'

export async function getPokemonByNameOrId(param: string | number, signal?: AbortSignal): Promise<PokemonDAO> {
  return await pokemonApi.fetchPokemonByIdOrName(param, signal)
}

export async function getPokemonSpecies(name: string, signal?: AbortSignal): Promise<PokemonSpeciesDAO> {
  return await pokemonApi.fetchPokemonSpecies(name, signal)
}

export async function getPokemonChainEvolution(pokemonChainUrl: string, signal?: AbortSignal): Promise<PokemonChainEvolutionDAO> {
  return await pokemonApi.fetchPokemonChanEvolution(pokemonChainUrl, signal)
}

export async function getPokemonAbility(abilityName: string, signal?: AbortSignal): Promise<AbilityDAO> {
  return await pokemonApi.fetchPokemonAbility(abilityName, signal)
}

export async function getAllPokemonAbilities(signal?: AbortSignal): Promise<AllAbilitiesDAO> {
  return await pokemonApi.fetchAllAbilities(signal)
}

export async function getPokemonWeaknesses(pokemonTypeUrl: string, signal?: AbortSignal): Promise<TypeDAO> {
  return await pokemonApi.fetchPokemonTypeWeaknesses(pokemonTypeUrl, signal)
}

export async function getPokemonGeneration(generation: string, signal?: AbortSignal) {
  return await pokemonApi.fetchGeneration(generation, signal)
}

export async function getPokemonNamesList(signal?: AbortSignal) {
  return await pokemonApi.fetchPokemonNames(signal)
}

export async function getPokemonType(type: PokemonType, signal?: AbortSignal): Promise<TypeDAO> {
  return await pokemonApi.fetchPokemonsByType(type, signal)
}
