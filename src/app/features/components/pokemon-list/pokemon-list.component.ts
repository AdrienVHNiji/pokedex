import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../core/services/pokemon.service';
import { CommonModule } from '@angular/common'; // Import pour utiliser ngFor et d'autres directives Angular
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  currentPage: number = 1;
  limit: number = 49;
  totalPokemons: number = 0;

  constructor(private readonly pokemonService: PokemonService, private readonly router: Router) {}

  ngOnInit(): void {
      this.loadPokemons();
    }
  
    
    loadPokemons(): void {
      const offset = (this.currentPage - 1) * this.limit;
  
      this.pokemonService.getPokemons(this.limit, offset).subscribe((response) => {
        this.pokemons = response.results;
        this.totalPokemons = response.count; 
      });
    }
  
    goToNextPage(): void {
      if (this.currentPage * this.limit < this.totalPokemons) {
        this.currentPage++;
        this.loadPokemons();
      }
    }

    goToPreviousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadPokemons();
      }
    }

  selectPokemon(name: string): void {
    this.router.navigate(['/pokemon', name]);
  }
}
