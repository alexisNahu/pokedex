export enum POKEMON_TYPES {
    NORMAL = 'normal',
    FIRE = 'fire',
    WATER = 'water',
    ELECTRIC = 'electric',
    GRASS = 'grass',
    ICE = 'ice',
    FIGHTING = 'fighting',
    POISON = 'poison',
    GROUND = 'ground',
    FLYING = 'flying',
    PSYCHIC = 'psychic',
    BUG = 'bug',
    ROCK = 'rock',
    GHOST = 'ghost',
    DRAGON = 'dragon',
    DARK = 'dark',
    STEEL = 'steel',
    FAIRY = 'fairy'
}
export interface pokemonWeaknesses {
    x0?: POKEMON_TYPES[] | []; // Inmunidad
    x05?: POKEMON_TYPES[] | []; // Resistencia
    x025?: POKEMON_TYPES[] | [];
    x1?: POKEMON_TYPES[] | [];
    x2?: POKEMON_TYPES[] | []; // Debilidades
    x4?: POKEMON_TYPES[] | []; // Por si reciben 4x
}


export const POKEMON_TYPE_COLORS: Record<POKEMON_TYPES, string> = {
    [POKEMON_TYPES.NORMAL]: '#A8A878',
    [POKEMON_TYPES.FIRE]: '#F08030',
    [POKEMON_TYPES.WATER]: '#6890F0',
    [POKEMON_TYPES.ELECTRIC]: '#F8D030',
    [POKEMON_TYPES.GRASS]: '#78C850',
    [POKEMON_TYPES.ICE]: '#98D8D8',
    [POKEMON_TYPES.FIGHTING]: '#C03028',
    [POKEMON_TYPES.POISON]: '#A040A0',
    [POKEMON_TYPES.GROUND]: '#E0C068',
    [POKEMON_TYPES.FLYING]: '#A890F0',
    [POKEMON_TYPES.PSYCHIC]: '#F85888',
    [POKEMON_TYPES.BUG]: '#A8B820',
    [POKEMON_TYPES.ROCK]: '#B8A038',
    [POKEMON_TYPES.GHOST]: '#705898',
    [POKEMON_TYPES.DRAGON]: '#7038F8',
    [POKEMON_TYPES.DARK]: '#705848',
    [POKEMON_TYPES.STEEL]: '#B8B8D0',
    [POKEMON_TYPES.FAIRY]: '#EE99AC'
};