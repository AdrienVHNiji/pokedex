import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Cela rend le service disponible globalement
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2'; // URL de l'API PokeAPI

  constructor(private http: HttpClient) {}

  // Récupérer la liste des Pokémon
  getPokemons(limit: number = 20): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon?limit=${limit}`);
  }

  // Récupérer les détails d'un Pokémon spécifique
  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${name}`);
  }
}
