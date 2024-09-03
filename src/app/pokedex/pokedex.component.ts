import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { PokemonList } from "../models/pokemon.model";
import { pokeCardButtonConfig } from "../config/config";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  public pokemonList: PokemonList[] = [];
  public isLoading: boolean = true;

  public overlay: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.pokemonService.getPokemonList().subscribe(data => {
      this.pokemonList = data;
      this.isLoading = false;
    });
  }

  findColor(pokemon: PokemonList): { mainColor: string, darkColor: string, lightColor: string } {
    const defaultColor = {
      mainColor: "#b7b7b7",
      darkColor: "#929292",
      lightColor: "#D3D3D3",
    };

    if (!pokemon || !pokemon.types || !Array.isArray(pokemon.types)) {
      return defaultColor;
    }

    for (let type of pokemon.types) {
      const config = pokeCardButtonConfig.find(config => config.type === type.type.name);

      if (config) {
        return {
          mainColor: config.mainColor,
          darkColor: config.darkColor,
          lightColor: config.lightColor,
        };
      }
    }
    return defaultColor;
  }

  toggleOverlay(){
    this.overlay = !this.overlay;
  }

  filterPokemon(selectedIds: number[]) {
    this.isLoading = true;
    const ids = selectedIds.map(id => id);
    this.pokemonService.getPokemonByIds(ids).subscribe(
      pokemonList => {
        this.pokemonList = pokemonList;
        this.isLoading = false;
      }
    );
  }
  filterType(selectedIds: string) {
    this.isLoading = true;
    this.pokemonService.getPokemonsByType(selectedIds).subscribe(
      pokemons => {
        let pokemonByType = pokemons;
        this.pokemonList = pokemonByType;
        this.isLoading = false;
      },
    );
  }
}

