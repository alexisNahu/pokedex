export const POKEMON_API_URL = 'https://pokeapi.co/api/v2'

export enum POKEMON_API_ENDPOINTS {
    POKEMON ='pokemon',
    POKEMON_SPECIES='pokemon-species',
    POKEMON_CHAIN_EVOLUTION='evolution-chain',
    ALL_POKEMONS='pokemon-species?limit=100000&offset=0',
    GENERATION='generation',
    TYPE='type',
    ALL_ABILITIES='ability?limit=10000',
    ABILITY='ability'
}
