import { PokemonSpeciesDAO, PokemonDAO, PokemonChainEvolutionDAO, AbilityDAO, TypeDAO } from '@models/dao'
import * as pokemonApi from '../api/pokeapi.api.ts'
import { PokemonType } from '@models/pokemonTypes.model.ts'

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

export async function getPokemonWeaknesses(pokemonTypeUrl: string): Promise<TypeDAO> {
    return await pokemonApi.fetchPokemonTypeWeaknesses(pokemonTypeUrl)
}

export async function getPokemonGeneration(generation: string) {
    return await pokemonApi.fetchGeneration(generation)
}

export async function getPokemonNamesList() {
    return await pokemonApi.fetchPokemonNames()
}

export async function getPokemonType(type: PokemonType): Promise<TypeDAO> {
    return await pokemonApi.fetchPokemonsByType(type)
}