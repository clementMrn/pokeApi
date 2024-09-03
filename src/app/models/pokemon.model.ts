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

