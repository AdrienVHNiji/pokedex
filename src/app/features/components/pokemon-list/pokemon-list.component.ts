import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../core/services/pokemon.service';
import { CommonModule } from '@angular/common'; // Import for using ngFor and other Angular directives
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  // Array to store the list of Pokémon
  pokemons: any[] = [];
  // Current page number for pagination
  currentPage: number = 1;
  // Number of Pokémon to display per page
  limit: number = 49;
  // Total number of Pokémon available
  totalPokemons: number = 0;

  constructor(private readonly pokemonService: PokemonService, private readonly router: Router) {}

  // Initialize component and load first page of Pokémon
  ngOnInit(): void {
    this.loadPokemons();
  }
  
  // Load Pokémon for the current page
  loadPokemons(): void {
    const offset = (this.currentPage - 1) * this.limit;
  
    this.pokemonService.getPokemons(this.limit, offset).subscribe((response) => {
      this.pokemons = response.results;
      this.totalPokemons = response.count; 
    });
  }
  
  // Navigate to the next page if available
  goToNextPage(): void {
    if (this.currentPage * this.limit < this.totalPokemons) {
      this.currentPage++;
      this.loadPokemons();
    }
  }

  // Navigate to the previous page if available
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemons();
    }
  }

  // Navigate to the detail view of a specific Pokémon
  selectPokemon(name: string): void {
    this.router.navigate(['/pokemon', name]);
  }
}
