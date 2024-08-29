// src/app/models/pokemon.model.ts

export interface Pokemon {
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
