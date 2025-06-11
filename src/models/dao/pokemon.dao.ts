import { POKEMON_TYPES } from "@models/pokemonTypes.model";

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface Type {
  slot: number;
  type: {
    name: POKEMON_TYPES;
    url: string;
  };
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface DescriptionDAO {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}


export interface PokemonDAO {
  id: number;
  name: string;
  is_default: boolean;
  abilities: Ability[];
  types: Type[];
  stats: Stat[];
  height: number;
  weight: number;
  base_experience: number;
  evolution_chain: {
    url: string;
    name: string
  },
  descriptions: DescriptionDAO[]
}