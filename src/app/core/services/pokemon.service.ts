import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Makes the service globally available
})
export class PokemonService {
  private readonly apiUrl = 'https://pokeapi.co/api/v2'; // PokeAPI base URL

  constructor(private readonly http: HttpClient) {}

  // Get a list of Pokémon with pagination
  getPokemons(limit: number, offset: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`);
  }

  // Get detailed information about a specific Pokémon
  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${name}`);
  }
}
