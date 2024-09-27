import {Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, from, generate, forkJoin, BehaviorSubject, switchMap, lastValueFrom} from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import {PokemonUrl, PokemonList, PokemonTypeImage, PokemonEvolutionChain} from "../models/pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  private pokemonUrl = `${this.baseUrl}/pokemon?limit=10&offset=0`;

  private genUrl = `${this.baseUrl}/generation/`;

  private typeImageUrl = 'https://pokebuildapi.fr/api/v1/types';

  public pokemonList = signal<PokemonList[]>([]);
  public evolutionList = signal<PokemonEvolutionChain[]>([]);
  constructor(private http: HttpClient) {
    this.getPokemonList().then();
  }


  async getPokemonList(): Promise<void> {
    try {
      // Récupération des 10 premiers Pokémon
      const data = await lastValueFrom(this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=10'));

      // Création des promesses pour récupérer les détails de chaque Pokémon
      const detailPromises = data.results.map((pokemon: PokemonUrl) =>
        lastValueFrom(this.http.get<PokemonUrl>(pokemon.url))
      );

      // Attente que toutes les promesses soient complètes
      const detailedPokemonList: PokemonList[] = await Promise.all(detailPromises);

      // Met à jour le signal avec la liste des Pokémon détaillés
      this.pokemonList.set(detailedPokemonList);
    } catch (error) {
      console.error('Erreur lors de la récupération des Pokémon:', error);
    }
  }

  getAllGenerations(): Observable<{ [key: string]: number[] }> {
    return new Observable(observer => {
      this.http.get<any>(this.genUrl).subscribe(data => {
        const genDetailsPromises = data.results.map((generation: { url: string; name: string; }) => {
          return this.http.get<any>(generation.url).toPromise().then(details => {
            const traductedName = details.names.find((name: { language: { name: string }}) =>
              name.language.name === 'en').name;

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

  baseRequest(url: string): Observable<any>{
    return this.http.get<any>(url);
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

  getSelectedPokemon(selectedPokemon? : PokemonList){
    return selectedPokemon;
  }


  getPokeEvolutionChain (idPokemon : number) {
    // etape 1 : récupérer le species
    // etape 2 : récupérer l'url de la chaine d'évolution
    // etape 3 : faire l'objet par rapport à ça

    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon-species/${idPokemon}/`)
    .subscribe(speciesData => {
      const evolutionChainUrl = speciesData.evolution_chain?.url;

      if (!evolutionChainUrl) {
        console.error('Aucune chaîne d\'évolution trouvée pour ce Pokémon.');
        return;
      }

      // Étape 3 : récupérer les données de la chaîne d'évolution
      this.http.get<any>(evolutionChainUrl).subscribe(evolutionData => { // TODO PAS DE ANY

        const firstEvolvName = evolutionData.chain?.species?.name || 'Inconnu';
        const firstEvolvId = this.getIdFromUrl(evolutionData.chain?.species?.url);

        const secondEvolvName = evolutionData.chain.evolves_to?.[0]?.species?.name || 'Inconnu';
        const secondEvolvId = this.getIdFromUrl(evolutionData.chain.evolves_to?.[0]?.species?.url );
        const secondEvolvMinLevel = evolutionData.chain.evolves_to?.[0]?.evolution_details?.[0]?.min_level || 'Niveau inconnu';

        const thirdEvolvName = evolutionData.chain.evolves_to?.[0]?.evolves_to?.[0]?.species?.name || 'Inconnu';
        const thirdEvolvId = this.getIdFromUrl(evolutionData.chain.evolves_to?.[0]?.evolves_to?.[0]?.species?.url);
        const thirdEvolvMinLevel = evolutionData.chain.evolves_to?.[0]?.evolves_to?.[0]?.evolution_details?.[0]?.min_level || 'Niveau inconnu';

        const chainObject: PokemonEvolutionChain[] = [
          { id: firstEvolvId, name: firstEvolvName },
          { id: secondEvolvId, name: secondEvolvName, evolvMinLevel: secondEvolvMinLevel },
          { id: thirdEvolvId, name: thirdEvolvName, evolvMinLevel: thirdEvolvMinLevel }
        ];

        this.evolutionList.set(chainObject);
        console.log("Chaîne d'évolution", chainObject);
      });
    });
  
  }

  getIdFromUrl(url: string): number {
    // Vérifie si l'URL est valide
    if (!url) return 0;

    console.log("url", url);

    let id = '';

    // Parcours l'URL à l'envers
    for (let i = url.length - 1; i >= 0; i--) {
        // Saute le dernier caractère (qui est normalement '/')
        if (i === url.length - 1) continue; 
        const char = url[i];
        // Vérifie si le caractère est un chiffre
        if (char >= '0' && char <= '9') {
            id = char + id; // Ajoute le chiffre trouvé à l'ID
        } else if (id.length > 0) {
            // Arrête le processus si on a déjà commencé à trouver des chiffres
            break;
        }
    }
    return id.length > 0 ? parseInt(id, 10) : 0;
  }

}
