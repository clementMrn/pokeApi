import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, from, generate, forkJoin} from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import {Pokemon, PokemonList, PokemonTypeImage} from "../models/pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  private pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';

  private genUrl = 'https://pokeapi.co/api/v2/generation/';

  private typeImageUrl = 'https://pokebuildapi.fr/api/v1/types';

  constructor(private http: HttpClient) { }

  getPokemonList(): Observable<PokemonList[]> {
    return this.http.get<{ results: Pokemon[] }>(this.pokemonUrl).pipe(
      mergeMap(data => {
        if (!data.results) {
          throw new Error('Aucune donnée de Pokémon reçue');
        }
        const detailObservables = data.results.map(pokemon =>
          this.http.get<PokemonList>(pokemon.url).pipe(
            catchError(err => {
              console.error(`Erreur lors de la récupération des détails pour ${pokemon.url}:`, err);
              return [];
            })
          )
        );
        return from(Promise.all(detailObservables.map(observable => observable.toPromise()))).pipe(
          map(results => results.filter((result): result is PokemonList => result !== undefined)),
          catchError(error => {
            console.error('Erreur lors de la récupération des détails des Pokémon:', error);
            return from([]);
          })
        );
      })
    );
  }

  getAllGenerations(): Observable<{ [key: string]: number[] }> {
    return new Observable(observer => {
      this.http.get<any>(this.genUrl).subscribe(data => {
        const genDetailsPromises = data.results.map((generation: { url: string; name: string; }) => {
          return this.http.get<any>(generation.url).toPromise().then(details => {
            const traductedName = details.names.find((name: { language: { name: string }}) =>
              name.language.name === 'en')?.name || generation.name;

            const pokeIds = details.pokemon_species ?
              details.pokemon_species.map((species: any) => parseInt(species.url.split('/')[6], 10)) : [];

            return {
              name: traductedName,
              pokeIds: pokeIds
            };
          });
        });

        Promise.all(genDetailsPromises).then(generations => {
          const result = generations.reduce((acc, curr) => {
            acc[curr.name] = curr.pokeIds;
            return acc;
          }, {} as { [key: string]: number[] });

          observer.next(result);
          observer.complete();
        }).catch(error => {
          observer.error(error);
        });
      });
    });
  }

  getPokemonByIds(ids: number[]): Observable<any[]> {
    const requests = ids.map(id => this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`));
    return forkJoin(requests);
  }

  getPokemonsByType(typeName: string): Observable<PokemonList[]> {
        return new Observable(observer => {
      this.http.get<any>(`${this.baseUrl}/type/${typeName}`).subscribe(
        response => {
          const pokemonUrls: string[] = response.pokemon.map((pokemonEntry: any) => pokemonEntry.pokemon.url);
          const requests: Observable<PokemonList>[] = pokemonUrls.map(url => this.http.get<PokemonList>(url));
          forkJoin(requests).subscribe(
            pokemons => {
              observer.next(pokemons);
              observer.complete();
            },
            error => {
              observer.error(error);
            }
          );
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  getAllTypes(): Observable<string[]> {
    return new Observable(observer => {
      this.http.get<{ results: { name: string }[] }>(`${this.baseUrl}/type`).subscribe({
        next: (data) => {
          const types = data.results.map(result => result.name);
          observer.next(types);
          observer.complete();
        },
      });
    });
  }

  getTypeImages(): Observable<PokemonTypeImage[]> {
    return this.http.get<PokemonTypeImage[]>(this.typeImageUrl);
  }
  searchPokemon(wordToSearch: string): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}?limit=100`).pipe( // TODO aujourd'hui je limite à 100 mais l'idée étant de créer une fonction qui relance la recherche à mesure que l'utilisateur scroll
      map(response => {
        return response.results.filter((pokemon: { name: string; }) =>
          pokemon.name.toLowerCase().includes(wordToSearch)
        );
      })
    );
  }

}
