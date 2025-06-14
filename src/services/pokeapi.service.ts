import { PokemonSpeciesDAO, PokemonDAO, PokemonChainEvolutionDAO, AbilityDAO } from '@models/dao'
import * as pokemonApi from '../api/pokeapi.api.ts'

export async function getPokemonByNameOrId(param: string | number): Promise<PokemonDAO> {
    return await pokemonApi.fetchPokemonByIdOrName(param)
} 

export async function getPokemonSpecies(name: string): Promise<PokemonSpeciesDAO> {
    return await pokemonApi.fetchPokemonSpecies(name)
}

export async function getPokemonChainEvolution(pokemonChainUrl: string): Promise<PokemonChainEvolutionDAO> {
    return await pokemonApi.fetchPokemonChanEvolution(pokemonChainUrl)
}

export async function getPokemonAbility(pokemonAbilityUrl: string): Promise<AbilityDAO> {
    return await pokemonApi.fetchPokemonAbility(pokemonAbilityUrl)
}