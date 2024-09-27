import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'pokeid'
})

export class PokeIdPipe implements PipeTransform{
  transform(pokeId : number): string {

   return  pokeId.toString().padStart(3, '0');

    /*
    if (pokeId >= 1 && pokeId <= 9){
      return `00${pokeId}`
    } else if (pokeId >= 10 && pokeId <= 99){
      return  `0${pokeId}`
    } else {
      return `${pokeId}`
    }*/
  }
}
