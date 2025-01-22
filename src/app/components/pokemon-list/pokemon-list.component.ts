import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { CommonModule } from '@angular/common'; // Import pour utiliser ngFor et d'autres directives Angular
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true, // Rend le composant autonome
  imports: [CommonModule], // Ajoute les modules nécessaires pour ce composant
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = []; // Remplace par un tableau typé si nécessaire
  

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons(50).subscribe((response : any) => {
      this.pokemons = response.results.map((poke: any, index: number) => ({
        id: index + 1,
        name: poke.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        types: [],
      }));
    });
  }
  // Définition de la méthode selectPokemon
  selectPokemon(name: string): void {
    // Redirection vers la page de détails du Pokémon
    this.router.navigate(['/pokemon', name]);
  }
}
