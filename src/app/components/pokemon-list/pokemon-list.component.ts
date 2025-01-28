import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
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
  

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons(49).subscribe((response : any) => {
      this.pokemons = response.results.map((poke: any, index: number) => ({
        id: index + 1,
        name: poke.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        types: [],
      }));
    });
  }
  selectPokemon(name: string): void {
    this.router.navigate(['/pokemon', name]);
  }
}
