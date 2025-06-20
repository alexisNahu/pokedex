import { AllSpritesDAO } from "./dao";
import { POKEMON_TYPES, pokemonWeaknesses } from "./pokemonTypes.model"

export interface Stat {
    stat: string,
    value: number,
}

export enum RegionalVariants {
  ALOLA = "alola",
  GALAR = "galar",
  HISUI = "hisui",
  PALDEA = "paldea",
}


export const RegionalVersionsRecord: Record<string, string> = {
  galar: 'galarian',
  alola: 'alolan',
  hisui: 'hisuian',
  paldea: 'paldean'
}

export interface VariantPokemonDTO {
  id: number;
  name: string;
  types: POKEMON_TYPES[]
  abilities: AbilityDTO[] | []
  stats: Stat[]
  sprites: AllSpritesDAO
  variant_type: PossibleVariants
  height: string,
  weight: string,
  weaknesses: pokemonWeaknesses
}

export interface GameDescriptions {
  description: string,
  game: string
}

export interface Descriptions {
  en: GameDescriptions[],
  es: GameDescriptions[],
  jp: GameDescriptions[],
}

export interface AbilityDTO {
  en: {
    name: string,
    pokedex_description: string,
    in_game_effect: string,
  }[],
  es: {
    name: string,
    pokedex_description: string,
    in_game_effect: string,
  }[],
  jp: {
    name: string
    pokedex_description: string,
    in_game_effect: string
  }[]
}


export interface EvolutionChainDTO {
  name: string,
  sprite: AllSpritesDAO
}

export interface PokemonDTO {
    id: number,
    name: string,
    evolutionChain: EvolutionChainDTO[]
    types: POKEMON_TYPES[]
    descriptions:Descriptions
    abilities: AbilityDTO[] | []
    isLegendary: boolean
    isMythical: boolean
    stats: Array<Stat>
    megas: VariantPokemonDTO[]
    variants: VariantPokemonDTO[]
    gigamax: VariantPokemonDTO[]
    height: string,
    weight: string,
    generation: string
    sprites: AllSpritesDAO
    isMega: false
    variant_type: PossibleVariants
    weaknesses: pokemonWeaknesses

}

export type PokemonStat = 'hp' | 'attack' | 'defense' | 'specialattack' | 'specialdefense' | 'speed';

export enum PossibleVariants {
  REGIONAL_VARIANT = 'regional_variant',
  MEGA = 'mega',
  GIGAMAX = 'gigamax',
  BASE_POKEMON = 'base_pokemon'
} 


export type DescriptionLanguages = 'jp' | 'es' | 'en' 

