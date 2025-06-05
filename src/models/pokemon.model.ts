import { Stat } from "./dao"
import { POKEMON_TYPES } from "./pokemonTypes.model"

export interface PokemonDTO {
    id: number,
    name: string,
    evolutionChain: string[]
    types: POKEMON_TYPES[]
    descriptions: {game: string, description: string}[]
    abilities: string[]
    isLegendary: boolean
    isMythical: boolean
    stats: Stat[]
    megas: string[]
    forms: string[]
    generation: string
}