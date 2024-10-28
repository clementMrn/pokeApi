import { Component, OnInit } from '@angular/core';
import {PokemonDetailsPage, PokemonSpecies, PokemonList} from '../../models/pokemon.model';
import { PokemonService } from "../../service/pokemon.service";
import {buttonDetails, buttonDetailsConfig, pokeCardButtonConfig} from "../../config/config";
import {Router} from "@angular/router";

import { faVenus } from "@fortawesome/free-solid-svg-icons";
import { faMars } from "@fortawesome/free-solid-svg-icons";
import {checkPort} from "@angular-devkit/build-angular/src/utils/check-port";


@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.scss']
})
export class PokeDetailsComponent implements OnInit {
  public pokemon!: PokemonDetailsPage;
  public faVenus = faVenus;
  public faMars = faMars;
  public pokemonSpecies: PokemonSpecies = {
    flavor_text_entries: [
      {
        flavor_text: "No flavor text available.",
        language: {
          name: "unknown",
          url: ""
        },
        version: {
          name: "unknown",
          url: ""
        }
      }
    ],
    gender_rate: 0,
    egg_groups: [
      {
        name: "unknown",
        url: ""
      }
    ],
    hatch_counter: 0
  };

  public buttonDetails: buttonDetails[] = [];
  public flavorTextToDisplay: string = '';
  public colors: { darkColor: string; lightColor: string; mainColor: string } = {
    darkColor: "#41c4a4",
    lightColor: "#5DDFC6",
    mainColor: "#48D0B0"
  };

  public selectedIndex: number = 0;

  public pokeStats : any;

  public totalPMokeStats : { base_state_number : number, base_state_calculus : number } = {base_state_number : 0, base_state_calculus : 0};

  public pokeEvolutionChain? : [
    {firstEvolvId: number, firstEvolvName: string},
    {secondEvolvName: string, secondEvolvMinLevel : number},
    {thirdEvolvName: string, thirdEvolvMinLevel : number}
  ];


  public isFavorite: boolean = false;

  constructor(public pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.pokemon = history.state.pokemon;
    this.buttonDetails = buttonDetailsConfig;

    if (this.pokemon && this.pokemon.types) {
      for (let type of this.pokemon.types) {
        console.log("this.pokemon.types", this.pokemon.types)
        const config = pokeCardButtonConfig.find(config => config.type ===  this.pokemon?.types[0].type.name);
        if (config) {
          this.colors = config;
          console.log("config", config);
        }
      }
    }


    this.selectedIndex = 0;

    if (this.pokemon?.species?.url) {
      this.pokemonService.baseRequest(`https://pokeapi.co/api/v2/pokemon-species/${this.pokemon.id}/`).subscribe(
        data => {
          this.pokemonSpecies = data;
          this.getAllflavorEntries("en");
        },
      );

      this.pokemonService.baseRequest(`https://pokeapi.co/api/v2/evolution-chain/${this.pokemon.id}/`).subscribe(
        data => {

          //this.pokeEvolutionChain = [{}];
          /*

          Version Réel
          const firstEvolvName = data.chain.species?.name;
          const firstEvolvid = data.id;

          const secondEvolvName = data.chain.evolves_to?.[0].species.name;
          const secondEvolvMinLevel= data.chain.evolves_to?.[0].evolution_details?.[0].min_level;


          const thirdEvolvName = data.chain.evolves_to?.[0].evolves_to?.[0].species.name;
          const thirdEvolvMinLevel = data.chain.evolves_to?.[0].evolves_to?.[0].evolution_details?.[0].min_level;


          this.pokeEvolutionChain = [
            {firstEvolvId: firstEvolvid, firstEvolvName: firstEvolvName},
            {secondEvolvName: secondEvolvName, secondEvolvMinLevel : secondEvolvMinLevel},
            {thirdEvolvName: thirdEvolvName, thirdEvolvMinLevel : thirdEvolvMinLevel}
          ];
*/
         // const evolvObj = { nameEvolv: firstEvolv };
          console.log(" this.pokeEvolutionChain",  this.pokeEvolutionChain);
          console.log("data", data);
        },
      );




    }

    if(this.pokemon){
      this.pokemonService.getPokeEvolutionChain(this.pokemon?.id);
    }

    this.pokeStats = this.pokemon?.stats

    this.totalRateStats(600);

    this.getFavorite(this.pokemon.name)
  }

  async goBack() {
    await this.router.navigate(['/pokedex']);
  }

  selectButton(index: number) {
    this.selectedIndex = index;
  }

  getAllflavorEntries(language : string){
    let allFlavorText : string[] = [];
    this.pokemonSpecies.flavor_text_entries.forEach(text => {
      if (text.language.name === language) {
       allFlavorText.push(text.flavor_text);
       this.flavorTextToDisplay = allFlavorText[23] || allFlavorText[0]
      }
    });
  }

  distributionCalculationMaleFemale(rate : number, gender : string){
    if ( rate === 0) {
      if ( gender ==="male" ) {
         return "100%"
      } else {
        return "0%"
      }
    } else if ( rate === 1 ) {
      if ( gender ==="male" ) {
        return "87.5%"
      } else {
        return "12.5%"
      }
    } else if ( rate === 2 ) {
      if ( gender ==="male" ) {
        return "75%"
      } else {
        return "25%"
      }
    } else if ( rate === 4 ) {
      if ( gender ==="male" ) {
        return "50%"
      } else {
        return "50%"
      }
    } else if ( rate === 6 ) {
      if ( gender ==="male" ) {
        return "25%"
      } else {
        return "75%"
      }
    } else if ( rate === 8 ) {
      if ( gender ==="male" ) {
        return "0%"
      } else {
        return "100%"
      }
    } else {
      return ''
    }


  }

  totalRateStats(totalStats : number){
    this.totalPMokeStats.base_state_number = this.pokeStats.reduce((acc: number, statObj: { base_stat: number }): number => acc + statObj.base_stat, 0);
    this.totalPMokeStats.base_state_calculus  = ( this.totalPMokeStats.base_state_number / totalStats) * 100;
  }



  toggleFavorite = () => {
    this.pokemonService.toggleFavoriteInStorage("favPokemon", this.pokemon);
    this.isFavorite = !this.isFavorite;
  }
  
  getFavorite(pokemonNameToFind: string) {
    let result = this.pokemonService.getStorage("favPokemon");
    
    if (result) {
      let storageList: PokemonList[] = JSON.parse(result);
      
      let pokemonExists = storageList.some(pokemon => pokemon.name === pokemonNameToFind);
  
      this.isFavorite = pokemonExists;
      
      if (pokemonExists) {
        console.log(`${pokemonNameToFind} est dans la liste des favoris.`);
      } else {
        console.log(`${pokemonNameToFind} n'est pas dans la liste des favoris.`);
      }
    }
}


}
