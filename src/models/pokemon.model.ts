import { AllSpritesDAO } from "./dao";
import { POKEMON_TYPES } from "./pokemonTypes.model"

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
    'galar': 'galarian',
    'alola': 'alolan'
}


export interface VariantPokemonDTO {
  id: number;
  name: string;
  types: POKEMON_TYPES[]
  abilities: string[]
  stats: Stat[]
  sprites: AllSpritesDAO
  variant_type: PossibleVariants
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
    abilities: string[]
    isLegendary: boolean
    isMythical: boolean
    stats: Array<Stat>
    megas: VariantPokemonDTO[]
    variants: VariantPokemonDTO[]
    generation: string
    sprites: AllSpritesDAO
    isMega: false
}

export type PokemonStat = 'hp' | 'attack' | 'defense' | 'specialattack' | 'specialdefense' | 'speed';

export enum PossibleVariants {
  REGIONAL_VARIANT = 'regional_variant',
  MEGA = 'mega',
  GIGAMAX = 'gigamax'
} 


export type DescriptionLanguages = 'jp' | 'es' | 'en' 

