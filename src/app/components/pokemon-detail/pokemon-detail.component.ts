import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute, 
    private pokemonService: PokemonService 
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokemonService.getPokemonDetails(name).subscribe((data) => {
        this.pokemon = data; // Stocker les données du Pokémon
      });
    }
  }

  goBack(): void {
    window.history.back();
  }
  
}
