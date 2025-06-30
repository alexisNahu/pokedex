import { PokemonChainEvolutionDAO, PokemonDAO, PokemonSpeciesDAO } from "@models/dao";
import { POKEMON_API_ENDPOINTS, POKEMON_API_URL } from "../config/pokeapi.endpoints";

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

export async function fetchPokemonAbility(pokemonAbilityUrl: string) {
    try {
        const response = await fetch(pokemonAbilityUrl)

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
        const res = await fetch("https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0")
        if (!res.ok) throw Error ('Error while fetching names 404')
        return await res.json()
    } catch(e) {
        throw new Error(`Error while fetching: ${e}`)
    }
}
