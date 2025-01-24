import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;
  pokemonList: any[] = []; 
  currentPokemonIndex: number = 0; 

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons(150).subscribe((response) => {
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

  getPokemonDetails(name: string): void {
    this.pokemonService.getPokemonDetails(name).subscribe((data) => {
      this.pokemon = data;
    });
  }

  navigateToPreviousPokemon(): void {
    if (this.currentPokemonIndex > 0) {
      const previousPokemon = this.pokemonList[this.currentPokemonIndex - 1];
      this.router.navigate(['/pokemon', previousPokemon.name]);
    }
  }

  navigateToNextPokemon(): void {
    if (this.currentPokemonIndex < this.pokemonList.length - 1) {
      const nextPokemon = this.pokemonList[this.currentPokemonIndex + 1];
      this.router.navigate(['/pokemon', nextPokemon.name]);
    }
  }

  goBack(): void {
    window.history.back();
  }
}
