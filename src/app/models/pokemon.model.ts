export interface PokemonUrl {
  name: string;
  url: string;
}

export interface PokemonList {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

export interface PokemonTypeImage {
  id: number;
  name: string;
  image: string;
  englishName: string;
}

export interface PokemonTypes {
  name: string;
  image: string;
  englishName: string;
}


export interface PokemonSpecies {
  flavor_text_entries: { flavor_text: string; language: { name: string, url: string }; version: { name: string, url: string }; }[];
  gender_rate : number;
  egg_groups : { name: string, url: string }[];
  hatch_counter : number;
}

export interface PokemonDetailsPage {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  name: string;
  order: number;
  past_abilities: any[];
  past_types: any[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: {
      dream_world: {
        front_default: string | null;
        front_female: string | null;
      };
      home: {
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
      official_artwork: {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        back_default: string;
        back_female: string | null;
        back_shiny: string;
        back_shiny_female: string | null;
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
    };
    versions: {
      [generation: string]: {
        [version: string]: {
          back_default: string;
          back_female?: string | null;
          back_shiny: string;
          back_shiny_female?: string | null;
          front_default: string;
          front_female?: string | null;
          front_shiny: string;
          front_shiny_female?: string | null;
          front_transparent?: string;
          back_transparent?: string;
          front_gray?: string;
          back_gray?: string;
          front_shiny_transparent?: string;
          back_shiny_transparent?: string;
        };
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
  stats : [
    {
      base_stat: number;
      effort: number;
      stat: {
        name : string;
      }
    }
  ]
}

export interface PokemonEvolutionChain {
  id?: number;  
  name: string; 
  evolvMinLevel?: number
}
