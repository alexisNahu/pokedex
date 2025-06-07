import { PokemonDAO } from "./dao"
import { POKEMON_TYPES } from "./pokemonTypes.model"

export interface Stat {
    stat: string,
    value: number,
}

export interface MegaPokemonDTO {
  id: number;
  name: string;
  types: POKEMON_TYPES[];
  abilities: string[];
  stats: Stat[];
  sprites: {
    shiny: string,
    normal: string
  };
  isMega: true
}

export interface PokemonDTO {
    id: number,
    name: string,
    evolutionChain: string[]
    types: POKEMON_TYPES[]
    descriptions: {game: string, description: string, lang: string}[]
    abilities: string[]
    isLegendary: boolean
    isMythical: boolean
    stats: Array<Stat>
    megas: MegaPokemonDTO[]
    forms: string[]
    generation: string
    sprites: {
        static_normal_front_2d: string,
        static_shiny_back_2d: string,
        static_normal_back_2d: string,
        static_shiny_front_2d: string,
        animated_normal_front_2d: string,
        animated_shiny_front_2d: string,
        animated_normal_back_2d: string,
        animated_shiny_back_2d: string,
    },
    isMega: false
}

export type PokemonStat = 'hp' | 'attack' | 'defense' | 'specialattack' | 'specialdefense' | 'speed';
