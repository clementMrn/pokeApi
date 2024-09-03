import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { buttonFab, buttonFabConfig } from "../../config/config";
import { PokemonService } from "../../service/pokemon.service";
import {PokemonTypeImage, PokemonTypes} from "../../models/pokemon.model";

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss']
})
export class FabComponent implements OnInit {
  public buttonFabs: buttonFab[] | undefined;
  public isFABVisible: boolean = false;

  public getAllGenAction: boolean = false;
  public allGen: { [key: string]: number[] } = {};

  public getAllTypeAction: boolean = false;
  public pokemonAvailableList: string[] = [];
  public pokemonTypesImage: PokemonTypeImage[] = [];
  public pokemonTypes: PokemonTypes[] = [];

  public getSearchAction: boolean = false;
  public searchResult: string = '';



  private generationOrder = [
    'generation-i',
    'generation-ii',
    'generation-iii',
    'generation-iv',
    'generation-v',
    'generation-vi',
    'generation-vii',
    'generation-viii',
    'generation-ix'
  ];


  @Output() toggleFABEmiter: EventEmitter<void> = new EventEmitter<void>();
  @Output() generationSelected: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() typeSelected: EventEmitter<string> = new EventEmitter<string>();


  @Input() pokemonList : any // TODO enlever le any

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.buttonFabs = buttonFabConfig;
  }

  toggleFAB() {
    this.isFABVisible = !this.isFABVisible;
    this.toggleFABEmiter.emit();
  }

  toggleGenerationFilter(){
    this.getAllGenAction = !this.getAllGenAction;
  }

  toggleTypeFilter(){
    this.getAllTypeAction = !this.getAllTypeAction;
  }

  toggleSearchFilter(){
    this.getSearchAction = !this.getSearchAction;
  }

  functionAction(buttonAction : string) {
    if(buttonAction === "search"){
      this.search()
    } else if (buttonAction === "getAllGen") {
      this.getAllGen()
    }  else if (buttonAction === "getAllType") {
      this.getAllType()
    } else {
      console.log("getFavorite");
    }
  }

  search(){
    this.getSearchAction = !this.getSearchAction;
  }

  getAllGen() {
    this.getAllGenAction = !this.getAllGenAction;
    this.pokemonService.getAllGenerations().subscribe(
      data => {
          const sortedKeys = Object.keys(data).sort((a, b) => {
          return this.generationOrder.indexOf(a) - this.generationOrder.indexOf(b);
        });

        this.allGen = {};
        sortedKeys.forEach(key => {
          this.allGen[key] = data[key];
        });
      },
    );
  }

  getAllType(){
    this.getAllTypeAction = !this.getAllTypeAction;
    this.pokemonService.getAllTypes().subscribe({
      next: (types) => {
        this.pokemonAvailableList = types;
      },
    });
    this.pokemonService.getTypeImages().subscribe(data => {
      this.pokemonTypesImage = data;
      this.pokemonTypes = this.pokemonTypesImage
        .filter(typeImage => this.pokemonAvailableList.includes(typeImage.englishName))
        .map(typeImage => ({
          name: typeImage.name,
          image: typeImage.image,
          englishName: typeImage.englishName
        }));
    });
  }

  getFavorite(){

  }

  selectGeneration(generationKey: string): void {
    const ids = this.allGen[generationKey];
    if (ids) {
      const idsArray: number[] = ids.map(id => id);
      this.generationSelected.emit(idsArray);
    }
    this.getAllGenAction = false;
    this.toggleFAB();
  }

  selectType(typeName: string): void {
    this.typeSelected.emit(typeName);
    this.getAllTypeAction = false;
    this.toggleFAB();
    console.log('this.typeSelected', this.typeSelected)
    // this.getAllTypeAction = false;
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    console.log(inputElement.value);
    this.pokemonService.searchPokemon(inputElement.value).subscribe(
      (results) => {
        console.log('Pokémons trouvés:', results);

      },
    );
  }
}
