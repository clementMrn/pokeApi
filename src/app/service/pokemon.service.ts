import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { Pokemon, PokemonList } from "../models/pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';

  constructor(private http: HttpClient) { }

  getPokemonList(): Observable<PokemonList[]> {
    return this.http.get<{ results: Pokemon[] }>(this.apiUrl).pipe(
      mergeMap(data => {
        if (!data.results) {
          throw new Error('Aucune donnée de Pokémon reçue');
        }

        // Création des observables pour obtenir les détails de chaque Pokémon
        const detailObservables = data.results.map(pokemon =>
          this.http.get<PokemonList>(pokemon.url).pipe(
            catchError(err => {
              console.error(`Erreur lors de la récupération des détails pour ${pokemon.url}:`, err);
              return []; // Retourner un tableau vide en cas d'erreur pour ne pas casser le flux
            })
          )
        );

        // Combinaison des résultats des observables
        return from(Promise.all(detailObservables.map(observable => observable.toPromise()))).pipe(
          map(results => results.filter((result): result is PokemonList => result !== undefined)),
          catchError(error => {
            console.error('Erreur lors de la récupération des détails des Pokémon:', error);
            return from([]); // Retourner un tableau vide en cas d'erreur
          })
        );
      })
    );
  }
}
