import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../../core/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  // Current Pokémon details
  pokemon: any;
  // List of all Pokémon for navigation
  pokemonList: any[] = []; 
  // Index of the current Pokémon in the list
  currentPokemonIndex: number = 0; 

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pokemonService: PokemonService,
    private readonly router: Router
  ) {}

  // Initialize component and load Pokémon details
  ngOnInit(): void {
    this.pokemonService.getPokemons(this.pokemonList.length, 1).subscribe((response) => {
      this.pokemonList = response.results;

      this.route.paramMap.subscribe((params) => {
        const name = params.get('name');
        if (name) {
          this.currentPokemonIndex = this.pokemonList.findIndex(
            (poke) => poke.name === name
          );

          this.getPokemonDetails(name);
        }
      });
    });
  }

  // Fetch detailed information about a specific Pokémon
  getPokemonDetails(name: string): void {
    this.pokemonService.getPokemonDetails(name).subscribe((data) => {
      this.pokemon = data;
    });
  }

  // Navigate to the previous Pokémon in the list
  navigateToPreviousPokemon(): void {
    if (this.currentPokemonIndex > 0) {
      const previousPokemon = this.pokemonList[this.currentPokemonIndex - 1];
      this.router.navigate(['/pokemon', previousPokemon.name]);
    }
  }

  // Navigate to the next Pokémon in the list
  navigateToNextPokemon(): void {
    if (this.currentPokemonIndex < this.pokemonList.length - 1) {
      const nextPokemon = this.pokemonList[this.currentPokemonIndex + 1];
      this.router.navigate(['/pokemon', nextPokemon.name]);
    }
  }

  // Return to the Pokémon list view
  goBack(): void {
    this.router.navigate(['/']);
  }
}
