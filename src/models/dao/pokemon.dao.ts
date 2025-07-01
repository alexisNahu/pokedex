import { POKEMON_TYPES } from "@models/pokemonTypes.model";

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface EffectEntries {
    effect: string;
    short_effect: string;
    language: {
      name: string;
      url: string;
    }
  }

export interface AbilityDAO {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: {
    name: string;
    url: string;
  };
  effect_entries: EffectEntries[];
  flavor_text_entries: DescriptionDAO[];
  pokemon: {
    is_hidden: boolean;
    slot: number;
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}


export interface Type {
  slot: number;
  type: {
    name: POKEMON_TYPES;
    url: string;
  };
}

export interface PokemonNamesDAO {
    name: string,
    url: string,
}[]

export interface TypeDAO {
    name: string;
    damage_relations: {
        double_damage_from: { name: string; url: string }[];
        half_damage_from: { name: string; url: string }[];
        no_damage_from: { name: string; url: string }[];
        double_damage_to: { name: string; url: string }[];
        half_damage_to: { name: string; url: string }[];
        no_damage_to: { name: string; url: string }[];
    };
    // Hay más información en el Type de PokéAPI, pero aquí incluimos lo más relevante
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