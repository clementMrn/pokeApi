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
      this.isLoading = false; // Déplacer cette ligne ici pour qu'elle ne soit exécutée qu'après avoir reçu les données
      console.log("this.pokemonList", this.pokemonList);
    }, error => {
      console.error('Error fetching Pokémon list', error);
      this.isLoading = false; // Assurez-vous que isLoading est mis à false en cas d'erreur
    });
  }

  findColor(pokemon: PokemonList): { mainColor: string, darkColor: string, lightColor: string } {
    // Valeur par défaut en cas de type non trouvé
    const defaultColor = {
      mainColor: "#b7b7b7", // Couleur par défaut pour le type non défini
      darkColor: "#929292",
      lightColor: "#D3D3D3",
    };

    // Vérifier que pokemon et pokemon.types existent
    if (!pokemon || !pokemon.types || !Array.isArray(pokemon.types)) {
      console.warn('Pokemon is null or types is undefined');
      return defaultColor; // Retourner la couleur par défaut si pokemon est null ou types est undefined
    }

    // Itérer à travers tous les types du Pokémon
    for (let type of pokemon.types) {
      const config = pokeCardButtonConfig.find(config => config.type === type.type.name);

      // Retourner les couleurs trouvées pour le premier type correspondant
      if (config) {
        return {
          mainColor: config.mainColor,
          darkColor: config.darkColor,
          lightColor: config.lightColor,
        };
      }
    }

    // Si aucun type ne correspond, retourner la couleur par défaut
    return defaultColor;
  }


  toggleOverlay(){
    this.overlay = !this.overlay;
  }
}
