import { PokemonChainEvolutionDAO, PokemonDAO, PokemonSpeciesDAO } from "@models/dao";
import { POKEMON_API_ENDPOINTS, POKEMON_API_URL } from "../config/pokeapi.endpoints";
import { PokemonType } from "@models/pokemonTypes.model";

function handleAbortableError(error: unknown, functionName: string) {
    if (error instanceof DOMException && error.name === "AbortError") {
        console.warn(`Fetch aborted: ${functionName}`)
        return Promise.reject('Aborted')
    }
    throw new Error(`Error while fetching in ${functionName}: ${error}`)
}

export async function fetchPokemonByIdOrName(id: number | string, signal?: AbortSignal): Promise<PokemonDAO> {
    try {
        const response = await fetch(`${POKEMON_API_URL}/${POKEMON_API_ENDPOINTS.POKEMON}/${id}`, { signal })
        if (!response.ok) throw new Error(`Pokemon not found: ${response.status}`)
        return await response.json()
    } catch(error){
        return handleAbortableError(error, 'fetchPokemonByIdOrName')
    }
}

export async function fetchPokemonSpecies(name: string, signal?: AbortSignal): Promise<PokemonSpeciesDAO> {
    try {
        const response = await fetch(`${POKEMON_API_URL}/${POKEMON_API_ENDPOINTS.POKEMON_SPECIES}/${name}`, { signal })
        if (!response.ok) throw new Error(`Species not found: ${response.status}`)
        return await response.json()
    } catch(error) {
        return handleAbortableError(error, 'fetchPokemonSpecies')
    }
}

export async function fetchPokemonChanEvolution(pokemonChainUrl: string, signal?: AbortSignal): Promise<PokemonChainEvolutionDAO> {
    try {
        const response = await fetch(pokemonChainUrl, { signal })
        if (!response.ok) throw new Error(`Chain Evolution not found: ${response.status}`)
        return await response.json()
    } catch(error) {
        return handleAbortableError(error, 'fetchPokemonChanEvolution')
    }
}

export async function fetchAllAbilities(signal?: AbortSignal) {
    try {
        const response = await fetch(`${POKEMON_API_URL}/${POKEMON_API_ENDPOINTS.ALL_ABILITIES}`, { signal })
        if (!response.ok) throw new Error(`All abilities not found`)
        return await response.json()
    } catch (error) {
        return handleAbortableError(error, 'fetchAllAbilities')
    }
}

export async function fetchPokemonAbility(abilityName: string, signal?: AbortSignal) {
    try {
        const response = await fetch(`${POKEMON_API_URL}/${POKEMON_API_ENDPOINTS.ABILITY}/${abilityName}`, { signal })
        if (!response.ok) throw new Error(`Pokemon ability not found: ${response.status}`)
        return await response.json()
    } catch(error) {
        return handleAbortableError(error, 'fetchPokemonAbility')
    }
}

export async function fetchPokemonTypeWeaknesses(pokemonTypeUrl: string, signal?: AbortSignal) {
    try {
        const response = await fetch(pokemonTypeUrl, { signal })
        if (!response.ok) throw new Error(`Pokemon type not found: ${response.status}`)
        return await response.json()
    } catch(error) {
        return handleAbortableError(error, 'fetchPokemonTypeWeaknesses')
    }
}

export async function fetchPokemonNames(signal?: AbortSignal) {
    try {
        const res = await fetch(`${POKEMON_API_URL}/${POKEMON_API_ENDPOINTS.ALL_POKEMONS}`, { signal })
        if (!res.ok) throw Error ('Error while fetching names 404')
        return await res.json()
    } catch(e) {
        return handleAbortableError(e, 'fetchPokemonNames')
    }
}

export async function fetchGeneration(gen: string, signal?: AbortSignal) {
    try {
        const res = await fetch(`${POKEMON_API_URL}/${POKEMON_API_ENDPOINTS.GENERATION}/${gen}`, { signal })
        if (!res.ok) throw Error ('generation not found 404')
        return await res.json()
    } catch(e) {
        return handleAbortableError(e, 'fetchGeneration')
    }
}

export async function fetchPokemonsByType(type: PokemonType, signal?: AbortSignal) {
    try {
        const response = await fetch(`${POKEMON_API_URL}/${POKEMON_API_ENDPOINTS.TYPE}/${type}`, { signal })
        if (!response.ok) throw new Error(`Pokemon type not found: ${response.status}`)
        return await response.json()
    } catch(error) {
        return handleAbortableError(error, 'fetchPokemonsByType')
    }
}
