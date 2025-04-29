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
  
  // Calculate total number of pages
  getTotalPages(): number {
    return Math.ceil(this.totalPokemons / this.limit);
  }

  // Get pages to display
  getPagesToDisplay(): number[] {
    const totalPages = this.getTotalPages();
    const pages: number[] = [];
    
    // Always add first page
    pages.push(1);
    
    // Add pages based on current position
    if (this.currentPage === 1) {
      // If on first page, show next 4 pages
      for (let i = 2; i <= Math.min(5, totalPages); i++) {
        pages.push(i);
      }
    } else if (this.currentPage === totalPages) {
      // If on last page, show previous 4 pages
      for (let i = Math.max(totalPages - 4, 2); i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // If in the middle, show 2 pages before and 2 pages after
      const start = Math.max(2, this.currentPage - 2);
      const end = Math.min(totalPages - 1, this.currentPage + 2);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    // Add last page if not already included
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }
    
    return pages;
  }

  // Navigate to a specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.loadPokemons();
    }
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
