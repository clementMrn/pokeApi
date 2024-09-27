import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'baseState'
})
export class BaseStatePipe implements PipeTransform {

  transform(baseState: string): string {
    console.log("baseState", baseState)
    if (baseState.includes("special-attack")){
      return "Sp. Atk"
    } else if (baseState.includes("special-defense")) {
      return "Sp. Def"
    } else {
      return baseState;
    }
  }

}
