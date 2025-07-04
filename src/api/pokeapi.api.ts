import { PokemonChainEvolutionDAO, PokemonDAO, PokemonSpeciesDAO } from "@models/dao";
import { POKEMON_API_ENDPOINTS, POKEMON_API_URL } from "../config/pokeapi.endpoints";
import { PokemonType } from "@models/pokemonTypes.model";

export async function fetchPokemonByIdOrName(id: number | string): Promise<PokemonDAO> {
    try {
        const response = await fetch(`${POKEMON_API_URL}/${POKEMON_API_ENDPOINTS.POKEMON}/${id}`)

        if (!response.ok) throw new Error(`Pokemon not found: ${response.status}`)
        
        return await response.json()
    } catch(error){
        throw new Error(`Error while fetching: ${error}`)
    }
}

export async function fetchPokemonSpecies(name: string): Promise<PokemonSpeciesDAO> {
    try {
        const response = await fetch(`${POKEMON_API_URL}/${POKEMON_API_ENDPOINTS.POKEMON_SPECIES}/${name}`)

        if (!response.ok) throw new Error(`Species not found: ${response.status}`)

        return await response.json()
    } catch(error) {
        throw new Error(`Error while fetching: ${error}`)
    }
}

export async function fetchPokemonChanEvolution(pokemonChainUrl: string): Promise<PokemonChainEvolutionDAO> {
    try {
        const response = await fetch(pokemonChainUrl)

        if (!response.ok) throw new Error(`Chain Evolution not found: ${response.status}`)

        return await response.json()
    } catch(error) {
        throw new Error(`Error while fetching: ${error}`)
    }
}

export async function fetchAllAbilities() {
    try {
        const response = await fetch(`${POKEMON_API_URL}/${POKEMON_API_ENDPOINTS.ALL_ABILITIES}`)
        
        if (!response.ok) throw new Error(`All abilities not found`)

        return await response.json()
    } catch (error) {
        throw new Error(`Error while fetching: ${error}`)
    }
}

export async function fetchPokemonAbility(abilityName: string) {
    try {
        const response = await fetch(`${POKEMON_API_URL}/${POKEMON_API_ENDPOINTS.ABILITY}/${abilityName}`)
        console.log(`${POKEMON_API_URL}/${POKEMON_API_ENDPOINTS.ABILITY}/${abilityName}`)

        if (!response.ok) throw new Error(`Pokemon ability not found: ${response.status}`)

        return await response.json()
    } catch(error) {
        throw new Error(`Error while fetching: ${error}`)
    }
}

export async function fetchPokemonTypeWeaknesses(pokemonTypeUrl: string) {
    try {
        const response = await fetch(pokemonTypeUrl)

        if (!response.ok) throw new Error(`Pokemon type not found: ${response.status}`)

        return await response.json()
    } catch(error) {
        throw new Error(`Error while fetching: ${error}`)
    }
}

export async function fetchPokemonNames() {
    try {
        const res = await fetch(`${POKEMON_API_URL}/${POKEMON_API_ENDPOINTS.ALL_POKEMONS}`)
        if (!res.ok) throw Error ('Error while fetching names 404')
        return await res.json()
    } catch(e) {
        throw new Error(`Error while fetching: ${e}`)
    }
}

export async function fetchGeneration(gen: string) {
    try {
        const res = await fetch(`${POKEMON_API_URL}/${POKEMON_API_ENDPOINTS.GENERATION}/${gen}`)
        if (!res.ok) throw Error ('generation not found 404')
        return await res.json()
    } catch(e) {
        throw Error (`Error while fetching: ${e}`)
    }
}

export async function fetchPokemonsByType(type: PokemonType) {
    try {
        const response = await fetch(`${POKEMON_API_URL}/${POKEMON_API_ENDPOINTS.TYPE}/${type}`)
        if (!response.ok) throw new Error(`Pokemon type not found: ${response.status}`)
        return response.json()
    } catch(error) {
        throw Error (`Error while fetching: ${error}`)
    }
}
