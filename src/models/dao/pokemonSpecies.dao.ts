interface Name {
  name: string;
  language: {
    name: string;
    url: string;
  };
}

export interface Variety {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  };
}

export interface PokemonSpeciesDAO {
  name: string;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  growth_rate: {
    name: string;
    url: string;
  };
  generation: {
    name: string;
    url: string;
  };
  evolution_chain: {
    url: string;
  };
  varieties: Variety[];
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }>;
  names: Name[];
}
