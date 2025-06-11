import { AllSpritesDAO } from "./dao";
import { POKEMON_TYPES } from "./pokemonTypes.model"

export interface Stat {
    stat: string,
    value: number,
}

export interface MegaPokemonDTO {
  id: number;
  name: string;
  types: POKEMON_TYPES[]
  abilities: string[]
  stats: Stat[]
  sprites: AllSpritesDAO
  isMega: true
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

export interface PokemonDTO {
    id: number,
    name: string,
    evolutionChain: {name: string, sprite: AllSpritesDAO}[]
    types: POKEMON_TYPES[]
    descriptions:Descriptions
    abilities: string[]
    isLegendary: boolean
    isMythical: boolean
    stats: Array<Stat>
    megas: MegaPokemonDTO[]
    forms: string[]
    generation: string
    sprites: AllSpritesDAO
    isMega: false
}

export type PokemonStat = 'hp' | 'attack' | 'defense' | 'specialattack' | 'specialdefense' | 'speed';

export type DescriptionLanguages = 'jp' | 'es' | 'en' 

